import { useRef, useEffect } from "react";

export function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function draw(event: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fillStyle = "green";
      ctx.fill();
    }

    canvas.addEventListener("mousedown", draw);

    return () => {
      canvas.removeEventListener("mousedown", draw);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ border: "1px solid black" }} />;
}
