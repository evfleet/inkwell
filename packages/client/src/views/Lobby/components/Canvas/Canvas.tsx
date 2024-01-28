import { useRef, useEffect, useState, useLayoutEffect } from "react";

type CanvasProps = {
  className?: string;
};

export function Canvas({ className }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useLayoutEffect(() => {
    const canvas = canvasRef.current!;

    console.log("layout");

    // clears canvas, need to save drawing in state
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }, []);

  useEffect(() => {
    function handleResize() {
      const canvas = canvasRef.current!;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      // redraw canvas content
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function handleMouseUp() {
      setIsDrawing(false);
    }

    function handleMouseDown() {
      setIsDrawing(true);
    }

    function handleMouseMove(event: MouseEvent) {
      if (!isDrawing) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      ctx.strokeStyle = "#000";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseUp);

    return () => {
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [isDrawing]);

  return <canvas ref={canvasRef} className={className} />;
}
