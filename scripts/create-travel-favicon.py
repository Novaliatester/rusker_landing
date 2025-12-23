#!/usr/bin/env python3
"""
Script to create a favicon with a white circular background from the Travel icon
"""

from PIL import Image, ImageDraw
import os

def create_circular_favicon(input_path, output_dir):
    """
    Create a favicon with a white circular background from an input image
    
    Args:
        input_path: Path to the input image (Travel.png)
        output_dir: Directory where the favicon files will be saved
    """
    # Open the input image
    img = Image.open(input_path)
    
    # Convert to RGBA if needed
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    # Get the size (use the larger dimension to ensure it fits in a circle)
    size = max(img.size)
    
    # Create a new image with white circular background
    output = Image.new('RGBA', (size, size), (255, 255, 255, 0))
    draw = ImageDraw.Draw(output)
    
    # Draw white circle as background
    draw.ellipse([(0, 0), (size, size)], fill=(255, 255, 255, 255))
    
    # Calculate position to center the icon
    icon_width, icon_height = img.size
    x_offset = (size - icon_width) // 2
    y_offset = (size - icon_height) // 2
    
    # Paste the icon on top of the white circle
    output.paste(img, (x_offset, y_offset), img)
    
    # Resize to common favicon sizes
    sizes = [16, 32, 48, 64, 128, 256]
    
    # Create ICO file with multiple sizes
    ico_images = []
    for size_val in sizes:
        resized = output.resize((size_val, size_val), Image.Resampling.LANCZOS)
        ico_images.append(resized)
    
    # Save as ICO (favicon.ico)
    ico_path = os.path.join(output_dir, 'favicon.ico')
    ico_images[0].save(ico_path, format='ICO', sizes=[(s, s) for s in sizes])
    print(f"✅ Created favicon.ico with sizes: {sizes}")
    
    # Also save as PNG for modern browsers (32x32 and 192x192)
    png_32 = output.resize((32, 32), Image.Resampling.LANCZOS)
    png_32_path = os.path.join(output_dir, 'favicon-32x32.png')
    png_32.save(png_32_path, format='PNG')
    print(f"✅ Created favicon-32x32.png")
    
    png_192 = output.resize((192, 192), Image.Resampling.LANCZOS)
    png_192_path = os.path.join(output_dir, 'favicon-192x192.png')
    png_192.save(png_192_path, format='PNG')
    print(f"✅ Created favicon-192x192.png")
    
    # Apple touch icon (180x180)
    apple_icon = output.resize((180, 180), Image.Resampling.LANCZOS)
    apple_path = os.path.join(output_dir, 'apple-touch-icon.png')
    apple_icon.save(apple_path, format='PNG')
    print(f"✅ Created apple-touch-icon.png")
    
    print(f"\n🎉 Favicon creation complete!")
    print(f"📁 Files created in: {output_dir}")

if __name__ == '__main__':
    # Paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    
    input_image = os.path.join(project_root, 'public', 'images', '2026 Rusker', 'Icons', 'Travel.png')
    output_dir = os.path.join(project_root, 'public')
    
    # Check if input exists
    if not os.path.exists(input_image):
        print(f"❌ Error: Input image not found at {input_image}")
        exit(1)
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Create favicon with white circular background
    print(f"🖼️  Processing image: {input_image}")
    print(f"📤 Output directory: {output_dir}")
    
    create_circular_favicon(input_image, output_dir)


