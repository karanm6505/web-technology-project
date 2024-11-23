import ply.lex as lex

tokens = [
    'ID',
    'NUMBER',
    'ASSIGN',
    'LESS',
    'GREATER',
    'EQUALS',
    'LPAREN',
    'RPAREN',
    'LBRACE',
    'RBRACE',
    'SEMICOLON',
    'PLUS',
    'MINUS',
    'HEADER',
    'POUND',
    'QUOTE',
]

reserved = {
    'if': 'IF',
    'else': 'ELSE',
    'while': 'WHILE',
    'for': 'FOR',
    'do': 'DO',
    'include': 'INCLUDE'
}

tokens = tokens + list(reserved.values())

t_ASSIGN = r'='
t_LESS = r'<'
t_GREATER = r'>'
t_EQUALS = r'=='
t_LPAREN = r'\('
t_RPAREN = r'\)'
t_LBRACE = r'\{'
t_RBRACE = r'\}'
t_SEMICOLON = r';'
t_PLUS = r'\+'
t_MINUS = r'-'
t_POUND = r'\#'
t_QUOTE = r'\"'


def t_HEADER(t):
    r'[a-zA-Z_][a-zA-Z_0-9]*\.h'
    return t

def t_ID(t):
    r'[a-zA-Z_][a-zA-Z_0-9]*'
    t.type = reserved.get(t.value, 'ID')
    return t

def t_NUMBER(t):
    r'\d+'
    t.value = int(t.value)
    return t

t_ignore = ' \t'

def t_newline(t):
    r'\n+'
    t.lexer.lineno += len(t.value)

def t_error(t):
    print(f"Illegal character '{t.value[0]}' at line {t.lexer.lineno}")
    t.lexer.skip(1)

lexer = lex.lex()


def test_lexer(data):
    lexer.input(data)
    while True:
        tok = lexer.token()
        if not tok:
            break
        print(tok)