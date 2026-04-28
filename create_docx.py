import zipfile
import shutil

# Create minimal DOCX structure
docx_content = {
    '[Content_Types].xml': b'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>''',
    '_rels/.rels': b'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>''',
    'word/document.xml': b'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:body>
<w:p>
<w:r>
<w:t>Sample Word Document</w:t>
</w:r>
</w:p>
</w:body>
</w:document>'''
}

# Create sample.docx
with zipfile.ZipFile('cypress/fixtures/sample.docx', 'w') as z:
    for filename, content in docx_content.items():
        z.writestr(filename, content)
print('Created sample.docx')

# Create sample2.docx
with zipfile.ZipFile('cypress/fixtures/sample2.docx', 'w') as z:
    for filename, content in docx_content.items():
        z.writestr(filename, content)
print('Created sample2.docx')

# Create sample.doc (copy of DOCX for simplicity)
shutil.copy('cypress/fixtures/sample.docx', 'cypress/fixtures/sample.doc')
print('Created sample.doc')
