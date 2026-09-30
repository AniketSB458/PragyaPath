import os
import zipfile

SOURCE_DIR = 'mern-pure-javascript'
OUTPUT_ZIP_ROOT = 'pragyapath-mern.zip'
OUTPUT_ZIP_PUBLIC = os.path.join('public', 'pragyapath-mern.zip')

os.makedirs('public', exist_ok=True)

def create_zip(target_path):
    with zipfile.ZipFile(target_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(SOURCE_DIR):
            for file in files:
                if file == '.DS_Store' or file.endswith('.pyc') or file.endswith('.zip'):
                    continue
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, SOURCE_DIR)
                zipf.write(file_path, arcname)
    
    file_size_kb = os.path.getsize(target_path) / 1024
    print(f"Created {target_path} successfully ({file_size_kb:.2f} KB)")

create_zip(OUTPUT_ZIP_ROOT)
create_zip(OUTPUT_ZIP_PUBLIC)
