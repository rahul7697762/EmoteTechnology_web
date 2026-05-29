import os

def replace_in_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace("background: 'var(--paper)'", "")
    content = content.replace("background: 'var(--hi)'", "background: 'rgba(0, 240, 255, 0.1)'")
    content = content.replace("background: 'var(--ink)'", "")
    content = content.replace("border: '2px solid var(--ink)'", "")
    content = content.replace("border: '1.5px solid var(--paper)'", "border: '1px solid var(--border-glass)'")
    content = content.replace("border: '2px dashed var(--ink)'", "")
    content = content.replace("borderTop: '2px solid var(--ink)'", "borderTop: '1px solid var(--border-glass)'")
    content = content.replace("borderBottom: '2px solid var(--ink)'", "borderBottom: '1px solid var(--border-glass)'")
    content = content.replace("borderBottom: '2px solid var(--paper)'", "borderBottom: '1px solid var(--border-glass)'")
    content = content.replace("borderTop: '2px solid var(--paper)'", "borderTop: '1px solid var(--border-glass)'")
    content = content.replace("borderBottomRightRadius: side === 'me' ? 4 : 18", "borderBottomRightRadius: side === 'me' ? 4 : 14")
    content = content.replace("borderBottomLeftRadius: side === 'them' ? 4 : 18", "borderBottomLeftRadius: side === 'them' ? 4 : 14")
    content = content.replace("background: i === 0 ? 'var(--hi)' : 'var(--paper)'", "background: i === 0 ? 'rgba(0,240,255,0.1)' : ''")
    content = content.replace("background: i === 0 ? 'var(--paper)' : 'transparent'", "background: i === 0 ? 'rgba(255,255,255,0.05)' : 'transparent'")
    content = content.replace('className="rough"', 'className="glass"')
    content = content.replace('rough ', 'glass ')
    content = content.replace(' rough', ' glass')
    content = content.replace('var(--paper)', 'var(--bg-glass)')
    content = content.replace('var(--ink)', 'var(--text-main)')
    content = content.replace("background: '#eceae2'", "")
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

files = [
    'app/page.tsx',
    'app/about/page.tsx',
    'app/blog/page.tsx',
    'app/contact/page.tsx',
    'app/services/whatsapp-chatbot/page.tsx',
    'components/Nav.tsx',
    'components/Footer.tsx',
    'components/ThreeD.tsx'
]

for file in files:
    if os.path.exists(file):
        replace_in_file(file)
