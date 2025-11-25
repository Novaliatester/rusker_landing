#!/usr/bin/env python3
"""
Script to create a favicon with rounded corners from the Rusker icon
"""

from PIL import Image, ImageDraw
import os

def create_rounded_favicon(input_path, output_path, corner_radius=20):
    """
    Create a favicon with rounded corners from an input image
    
    Args:
        input_path: Path to the input image
        output_path: Path where the favicon will be saved
        corner_radius: Radius of the rounded corners (in pixels)
    """
    # Open the input image
    img = Image.open(input_path)
    
    # Convert to RGBA if needed
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    # Create a mask for rounded corners
    mask = Image.new('L', img.size, 0)
    draw = ImageDraw.Draw(mask)
    
    # Draw a rounded rectangle on the mask
    draw.rounded_rectangle(
        [(0, 0), img.size],
        radius=corner_radius,
        fill=255
    )
    
    # Apply the mask to the image
    output = Image.new('RGBA', img.size, (255, 255, 255, 0))
    output.paste(img, (0, 0), mask)
    
    # Resize to common favicon sizes
    sizes = [16, 32, 48, 64, 128, 256]
    
    # Create ICO file with multiple sizes
    ico_images = []
    for size in sizes:
        resized = output.resize((size, size), Image.Resampling.LANCZOS)
        ico_images.append(resized)
    
    # Save as ICO (favicon.ico)
    ico_path = output_path.replace('.png', '.ico')
    ico_images[0].save(ico_path, format='ICO', sizes=[(s, s) for s in sizes])
    print(f"✅ Created favicon.ico with sizes: {sizes}")
    
    # Also save as PNG for modern browsers (32x32 and 192x192)
    png_32 = output.resize((32, 32), Image.Resampling.LANCZOS)
    png_32.save(output_path.replace('.ico', '-32x32.png'), format='PNG')
    print(f"✅ Created favicon-32x32.png")
    
    png_192 = output.resize((192, 192), Image.Resampling.LANCZOS)
    png_192.save(output_path.replace('.ico', '-192x192.png'), format='PNG')
    print(f"✅ Created favicon-192x192.png")
    
    # Apple touch icon (180x180)
    apple_icon = output.resize((180, 180), Image.Resampling.LANCZOS)
    apple_path = output_path.replace('favicon', 'apple-touch-icon')
    apple_icon.save(apple_path.replace('.ico', '.png'), format='PNG')
    print(f"✅ Created apple-touch-icon.png")
    
    print(f"\n🎉 Favicon creation complete!")
    print(f"📁 Files created in: {os.path.dirname(output_path)}")

if __name__ == '__main__':
    # Paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    
    input_image = os.path.join(project_root, 'public', 'images', 'logos', 'Icon 2025 (1).jpg')
    output_dir = os.path.join(project_root, 'app')
    output_path = os.path.join(output_dir, 'favicon.ico')
    
    # Check if input exists
    if not os.path.exists(input_image):
        print(f"❌ Error: Input image not found at {input_image}")
        exit(1)
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Create favicon with rounded corners (radius = 20% of image size)
    print(f"🖼️  Processing image: {input_image}")
    print(f"📤 Output directory: {output_dir}")
    
    # Get image size to calculate appropriate corner radius
    temp_img = Image.open(input_image)
    img_size = min(temp_img.size)
    corner_radius = int(img_size * 0.15)  # 15% of image size for rounded corners
    
    create_rounded_favicon(input_image, output_path, corner_radius)

