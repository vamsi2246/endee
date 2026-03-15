import os
import glob

def patch():
    site_packages = "venv/lib/python3.9/site-packages/endee"
    files = glob.glob(f"{site_packages}/**/*.py", recursive=True)
    
    for fname in files:
        with open(fname, "r") as f:
            content = f.read()
            
        # Add future annotations which allows 3.10 type hints in 3.9
        if "from __future__ import annotations" not in content and "X | Y" not in content:
            new_content = "from __future__ import annotations\n" + content
            with open(fname, "w") as f:
                f.write(new_content)
            print(f"Patched {fname}")

if __name__ == "__main__":
    patch()
