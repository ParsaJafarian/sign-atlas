"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card, Image, Text, Group, RingProgress } from "@mantine/core";
import classes from "./CardWithStats.module.css";

import {
  DrawingUtils,
  FilesetResolver,
  GestureRecognizer,
} from "@mediapipe/tasks-vision";

export default function ASLTranslator({
  getCategory,
  confidenceThreshold,
}: any) {
  const gestureRecognizer = useRef<GestureRecognizer | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const gestureOutputRef = useRef<HTMLDivElement>(null);
  const [gesture, setGesture] = useState<string>("");
  const [confidence, setConfidence] = useState<string>("");
  const [handedness, setHandedness] = useState<string>("");
  let webcamRunning: boolean = true;
  let categoriesCount: any = {};

  const enableCam = async () => {
    if (!gestureRecognizer) {
      alert("Please wait for gestureRecognizer to load");
      return;
    }

    // getUsermedia parameters.
    const constraints: MediaStreamConstraints = {
      video: true,
    };
    // webcamRunning = !webcamRunning;

    // Activate the webcam stream.
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.load();
        videoRef.current.addEventListener("loadeddata", () => {
          setTimeout(() => {
            predictWebcam();
          }, 500);
        });
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const getMostFrequentCategory = (): string | null => {
    let mostFrequentCategory: string | null = null;
    let maxCount = 0;
    for (const category in categoriesCount) {
      if (categoriesCount[category] > maxCount) {
        mostFrequentCategory = category;
        maxCount = categoriesCount[category];
      }
    }
    return mostFrequentCategory;
  };
  useEffect(() => {
    const createGestureRecognizer = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );
      const recognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "/gesture_recognizer.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
      });
      gestureRecognizer.current = recognizer;
      await enableCam();
    };
    createGestureRecognizer();

    // return () => {
    //   clearInterval(interval);
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function mapToAlphabet(categoryName: string): string {
    const categoryIndex = parseInt(categoryName, 10);
    if (!isNaN(categoryIndex) && categoryIndex >= 0 && categoryIndex <= 25) {
      return String.fromCharCode(categoryIndex + 65); // ASCII value of 'A' is 65
    } else {
      return categoryName; // Return the original category name if it's not a number or out of range
    }
  }

  let lastVideoTime = -1;

  const predictWebcam = async () => {
    if (!gestureRecognizer.current || !videoRef.current || !canvasRef.current) {
      return;
    }
    let nowInMs = Date.now();

    const video = videoRef.current;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d")!;
    // const gestureOutput = gestureOutputRef.current;

    let results: any = undefined;
    if (
      video.currentTime !== lastVideoTime &&
      video.videoWidth !== 0 &&
      video.videoHeight !== 0
    ) {
      lastVideoTime = video.currentTime;
      results = gestureRecognizer.current.recognizeForVideo(video, nowInMs);
    }

    if (results && results.landmarks) {
      const drawingUtils = new DrawingUtils(canvasCtx);
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

      for (const landmarks of results.landmarks) {
        drawingUtils.drawConnectors(
          landmarks,
          GestureRecognizer.HAND_CONNECTIONS,
          {
            color: "#00FF00",
            lineWidth: 5,
          }
        );
        drawingUtils.drawLandmarks(landmarks, {
          color: "#FF0000",
          radius: 1,
        });
      }
      canvasCtx.restore();
      let categoryName = "None";
      if (results.gestures.length > 0) {
        // gestureOutput.style.display = "block";
        categoryName = results.gestures[0][0].categoryName;
        categoryName = mapToAlphabet(categoryName);
        if (categoryName === "") categoryName = "Unsure";

        const categoryScore = parseFloat(results.gestures[0][0].score).toFixed(
          2
        );
        const handedness = results.handednesses[0][0].displayName;

        setGesture(categoryName);
        setConfidence(categoryScore);
        setHandedness(handedness);
      }
      if (getCategory) {
        getCategory(categoryName);
      }
    }

    // Call this function again to keep predicting when the browser is ready.
    if (webcamRunning) {
      window.requestAnimationFrame(predictWebcam);
    }
  };

  return (
    <Card withBorder shadow="xl" padding="lg" className={classes.card}>
      {/* <button onClick={enableCam}>
        {webcamRunning ? "DISABLE PREDICTIONS" : "ENABLE PREDICTIONS"}
      </button> */}
      <Card.Section>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          id="webcam"
          className={classes.video}
          // style={{ height: videoHeight, width: videoHeight }}
        ></video>
      </Card.Section>

      <Card.Section>
        <canvas
          ref={canvasRef}
          id="output_canvas"
          className={classes.canvas}
          style={{
            // height: videoRef.current?.offsetHeight,
            // width: videoRef.current?.offsetWidth,
          }}
        ></canvas>
      </Card.Section>
      <Card.Section className={classes.footer}>
        <div key="GestureRecognizer">
          <Text size="xs" c="dimmed">
            GestureRecognizer
          </Text>
          <Text fw={500} size="sm">
            {gesture}
          </Text>
        </div>
        <div key="Confidence">
          <Text size="xs" c="dimmed">
            Confidence
          </Text>
          <Text fw={500} size="sm">
            {confidence}
          </Text>
        </div>
        <div key="Handedness">
          <Text size="xs" c="dimmed">
            Handedness
          </Text>
          <Text fw={500} size="sm">
            {handedness}
          </Text>
        </div>
      </Card.Section>
    </Card>
  );
}
