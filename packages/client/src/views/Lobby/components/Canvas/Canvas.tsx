import { useRef, useEffect, useState } from "react";

type CanvasProps = {
  className?: string;
};

export function Canvas({ className }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("black");

  function handleClear() {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  useEffect(() => {
    function resizeCanvas() {
      const canvas = canvasRef.current!;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function getCoordinates(event: MouseEvent) {
      const rect = canvas.getBoundingClientRect();

      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }

    function handleDrawStart(event: MouseEvent) {
      const { x, y } = getCoordinates(event);

      setIsDrawing(true);

      ctx.beginPath();
      ctx.moveTo(x, y);

      event.preventDefault();
    }

    function handleDrawStop(event: MouseEvent) {
      if (isDrawing) {
        setIsDrawing(false);

        ctx.stroke();
        ctx.closePath();
      }

      event.preventDefault();
    }

    function handleDraw(event: MouseEvent) {
      if (!isDrawing) {
        return;
      }

      const { x, y } = getCoordinates(event);

      ctx.strokeStyle = color;
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineTo(x, y);
      ctx.stroke();

      event.preventDefault();
    }

    canvas.addEventListener("mouseup", handleDrawStop);
    canvas.addEventListener("mousedown", handleDrawStart);
    canvas.addEventListener("mousemove", handleDraw);
    canvas.addEventListener("mouseleave", handleDrawStop);

    return () => {
      canvas.removeEventListener("mouseup", handleDrawStop);
      canvas.removeEventListener("mousedown", handleDrawStart);
      canvas.removeEventListener("mousemove", handleDraw);
      canvas.removeEventListener("mouseleave", handleDrawStop);
    };
  }, [color, isDrawing]);

  return (
    <div>
      <div>
        <button onClick={handleClear}>Clear</button>
        <button>Undo</button>
        <button onClick={() => setColor("red")}>Red</button>
        <button onClick={() => setColor("black")}>Black</button>
      </div>
      <canvas ref={canvasRef} className={className} />
    </div>
  );
}
