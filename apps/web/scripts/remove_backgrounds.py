#!/usr/bin/env python3
"""
Remove backgrounds from logo images.
Uses PIL to make white/light backgrounds transparent.
"""

from PIL import Image
import os
import sys

def remove_background(image_path, output_path, threshold=240):
    """
    Remove white/light background from image.
    threshold: RGB value threshold (0-255). Pixels lighter than this become transparent.
    """
    try:
        img = Image.open(image_path)
        
        # Convert to RGBA if not already
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # Get image data
        data = img.getdata()
        
        # Create new image data with transparency
        new_data = []
        for item in data:
            # If pixel is white/light (all RGB values above threshold), make it transparent
            if item[0] > threshold and item[1] > threshold and item[2] > threshold:
                new_data.append((255, 255, 255, 0))  # Transparent
            else:
                new_data.append(item)
        
        # Update image with new data
        img.putdata(new_data)
        
        # Save with transparency
        img.save(output_path, 'PNG')
        print(f"✓ Processed: {os.path.basename(image_path)} -> {os.path.basename(output_path)}")
        return True
    except Exception as e:
        print(f"✗ Error processing {image_path}: {e}")
        return False

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    logos_dir = os.path.join(script_dir, '../public/images/logos')
    
    images_to_process = [
        ('essec-new.png', 'essec.png'),
        ('french-tech.png', 'french-tech.png'),
        ('shoptalk.png', 'shoptalk.png'),
        ('station-f.png', 'station-f.png'),
    ]
    
    print("Removing backgrounds from logos...\n")
    
    for input_file, output_file in images_to_process:
        input_path = os.path.join(logos_dir, input_file)
        output_path = os.path.join(logos_dir, output_file)
        
        if os.path.exists(input_path):
            # Try different thresholds for better results
            threshold = 240  # Default threshold
            if 'essec' in input_file.lower():
                threshold = 250  # ESSEC might have very white background
            elif 'french-tech' in input_file.lower():
                threshold = 230  # French Tech might have slightly off-white
            
            remove_background(input_path, output_path, threshold)
        else:
            print(f"✗ File not found: {input_file}")
    
    print("\n✓ Background removal complete!")
    print("Note: For complex backgrounds, you may need to use specialized tools like remove.bg")

if __name__ == '__main__':
    main()

