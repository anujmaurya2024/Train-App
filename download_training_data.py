"""Download the Kaggle competition files after an interactive KaggleHub login."""

from pathlib import Path

import kagglehub


COMPETITION = "indian-railways-predict-train-delay"
OUTPUT_DIR = Path("data/kaggle")


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    kagglehub.login()
    path = kagglehub.competition_download(COMPETITION, output_dir=str(OUTPUT_DIR))
    print(f"Downloaded competition files to: {path}")


if __name__ == "__main__":
    main()
