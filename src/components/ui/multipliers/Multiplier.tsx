import styles from "./Multiplier.module.css";

type MultiplierVariant =
  | "low"
  | "medium"
  | "high"
  | "veryHigh"
  | "extreme";

interface MultiplierProps {
  odd: number;
  className?: string;
}

const getVariant = (odd: number): MultiplierVariant => {
  if (odd < 2) return "low";
  if (odd < 10) return "medium";
  if (odd < 20) return "high";
  if (odd < 50) return "veryHigh";

  return "extreme";
};

export default function Multiplier({
  odd,
  className,
}: MultiplierProps) {
  const variant = getVariant(odd);

  return (
    <div
      className={[
        styles.multiplier,
        styles[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
        <span className={styles.value}>
            {odd.toFixed(2)}x
        </span>
    </div>
  );
}