import os
import glob

d = r'C:\Users\Peter Yue\Desktop\三川流域誌\mycms\home\templates\home'
for filepath in glob.glob(os.path.join(d, '*.html')):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace literal \ followed by ' with just '
    new_content = content.replace("\\'", "'")
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

print("Fixed backslashes in all HTML templates.")
