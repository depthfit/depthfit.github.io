import cv2
import numpy as np

def generate_svg_from_img(img_path, out_path, box, fill_color):
    img_array = np.fromfile(img_path, np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
    x1, y1, x2, y2 = box
    cropped = img[y1:y2, x1:x2]
    gray = cv2.cvtColor(cropped, cv2.COLOR_BGR2GRAY)
    
    _, mask = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY_INV)
    contours, hierarchy = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    
    svg_paths = []
    width = x2 - x1
    height = y2 - y1
    
    for cnt in contours:
        epsilon = 0.001 * cv2.arcLength(cnt, True)
        approx = cv2.approxPolyDP(cnt, epsilon, True)
        
        if len(approx) > 2:
            path = 'M ' + ' L '.join([f'{pt[0][0]},{pt[0][1]}' for pt in approx]) + ' Z'
            svg_paths.append(path)
            
    with open(out_path, 'w') as f:
        f.write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}">\n')
        for path in svg_paths:
            f.write(f'  <path d="{path}" fill="{fill_color}" fill-rule="evenodd"/>\n')
        f.write('</svg>\n')

# Tighter crop to avoid the swoosh on the bottom and navigation on the right
generate_svg_from_img('_raw_materials/三川流域誌（首頁）.jpg', 'assets/title.svg', (1700, 450, 4100, 1050), '#094a9a')
generate_svg_from_img('_raw_materials/三川流域誌（首頁）.jpg', 'assets/badge_text.svg', (300, 1800, 1500, 2200), '#094a9a')
print('SVGs generated successfully')
