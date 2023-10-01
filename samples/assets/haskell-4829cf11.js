const e=Object.freeze({fileTypes:["hs","hs-boot","hsig"],keyEquivalent:"^~H",name:"haskell",patterns:[{include:"#liquid_haskell"},{include:"#comment_like"},{include:"#numeric_literals"},{include:"#string_literal"},{include:"#char_literal"},{match:"(?<!@|#)-\\}",name:"invalid"},{match:"(\\()\\s*(\\))",name:"constant.language.unit.haskell",captures:{1:{name:"punctuation.paren.haskell"},2:{name:"punctuation.paren.haskell"}}},{match:"(\\()(#)\\s*(#)(\\))",name:"constant.language.unit.unboxed.haskell",captures:{1:{name:"punctuation.paren.haskell"},2:{name:"keyword.operator.hash.haskell"},3:{name:"keyword.operator.hash.haskell"},4:{name:"punctuation.paren.haskell"}}},{match:"(\\()\\s*,[\\s,]*(\\))",name:"support.constant.tuple.haskell",captures:{1:{name:"punctuation.paren.haskell"},2:{name:"punctuation.paren.haskell"}}},{match:"(\\()(#)\\s*,[\\s,]*(#)(\\))",name:"support.constant.tuple.unboxed.haskell",captures:{1:{name:"punctuation.paren.haskell"},2:{name:"keyword.operator.hash.haskell"},3:{name:"keyword.operator.hash.haskell"},4:{name:"punctuation.paren.haskell"}}},{match:"(\\[)\\s*(\\])",name:"constant.language.empty-list.haskell",captures:{1:{name:"punctuation.bracket.haskell"},2:{name:"punctuation.bracket.haskell"}}},{begin:"(\\b(?<!')(module)|^(signature))(\\b(?!'))",beginCaptures:{2:{name:"keyword.other.module.haskell"},3:{name:"keyword.other.signature.haskell"}},end:"(?=\\b(?<!')where\\b(?!'))",name:"meta.declaration.module.haskell",patterns:[{include:"#comment_like"},{include:"#module_name"},{include:"#module_exports"},{match:"[a-z]+",name:"invalid"}]},{include:"#ffi"},{begin:"^(\\s*)(class)(\\b(?!'))",beginCaptures:{2:{name:"keyword.other.class.haskell"}},end:`(?x) # Detect end of class declaration:
         # 'where' keyword
   (?=(?<!')\\bwhere\\b(?!'))  
         # Decreasing indentation
   |(?=\\}|;)      # Explicit indentation
   |^(?!          # Implicit indentation: end match on newline *unless* the new line is either:
       \\1\\s+\\S    # - more indented, or
     | \\s*        # - starts with whitespace, followed by:
       (?: $      #   - the end of the line (i.e. empty line), or
       |\\{-[^@]   #   - the start of a block comment, or
       |--+       #   - the start of a single-line comment.
          (?![\\p{S}\\p{P}&&[^(),;\\[\\]{}\`_"']]).*$) # non-symbol
                  # The double dash may not be followed by other operator characters
                  # (then it would be an operator, not a comment)
     )`,name:"meta.declaration.class.haskell",patterns:[{include:"#comment_like"},{include:"#where"},{include:"#type_signature"}]},{begin:`(?x)
  ^(\\s*)(data|newtype)(?:\\s+(instance))?\\s+
  # Keep consuming characters until:
  ((?:(?!
  # the equals symbol or the start of a single-line comment, or
    (?: 
      (?<![\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']]) # non-symbol
      (?:=|--+)
      (?![\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']])  # non-symbol
    )
  # the "where" or "deriving" keywords, or
  | (?:\\b(?<!')(?:where|deriving)\\b(?!'))
  # the start of a block comment.
  | {-
  #
  ).)*)
  (?=\\b(?<!'')where\\b(?!''))`,beginCaptures:{2:{name:"keyword.other.$2.haskell"},3:{name:"keyword.other.instance.haskell"},4:{patterns:[{include:"#type_signature"}]}},name:"meta.declaration.$2.generalized.haskell",end:`(?x) # Detect end of data declaration:
         # Deriving clause
   (?=(?<!')\\bderiving\\b(?!'))  
         # Decreasing indentation
   |(?=\\}|;)      # Explicit indentation
   |^(?!          # Implicit indentation: end match on newline *unless* the new line is either:
       \\1\\s+\\S    # - more indented, or
     | \\s*        # - starts with whitespace, followed by:
       (?: $      #   - the end of the line (i.e. empty line), or
       |\\{-[^@]   #   - the start of a block comment, or
       |--+       #   - the start of a single-line comment.
          (?![\\p{S}\\p{P}&&[^(),;\\[\\]{}\`_"']]).*$) # non-symbol
                  # The double dash may not be followed by other operator characters
                  # (then it would be an operator, not a comment)
     )
`,patterns:[{include:"#comment_like"},{begin:`(?x)
  (?<!')\\b(where)
  \\s*(\\{)(?!-)`,end:"(\\})",beginCaptures:{1:{name:"keyword.other.where.haskell"},2:{name:"punctuation.brace.haskell"}},endCaptures:{1:{name:"punctuation.brace.haskell"}},patterns:[{include:"#comment_like"},{include:"#gadt_constructor"},{match:";",name:"punctuation.semicolon.haskell"}]},{match:"\\b(?<!')(where)\\b(?!')",name:"keyword.other.where.haskell"},{include:"#deriving"},{include:"#gadt_constructor"}]},{include:"#role_annotation"},{name:"meta.declaration.pattern.type.haskell",begin:"^(\\s*)(pattern)\\s+(.*?)\\s+(::|∷)(?![\\p{S}\\p{P}&&[^(),;\\[\\]`{}_\"']])",beginCaptures:{2:{name:"keyword.other.pattern.haskell"},3:{patterns:[{include:"#comma"},{include:"#data_constructor"}]},4:{name:"keyword.operator.double-colon.haskell"}},end:`(?x) # Detect end of pattern type definition by decreasing indentation:
  (?=\\}|;)       # Explicit indentation
  |^(?!          # Implicit indentation: end match on newline *unless* the new line is either:
      \\1\\s+\\S    # - more indented, or
    | \\s*        # - starts with whitespace, followed by:
      (?: $      #   - the end of the line (i.e. empty line), or
      |\\{-[^@]   #   - the start of a block comment, or
      |--+       #   - the start of a single-line comment.
         (?![\\p{S}\\p{P}&&[^(),;\\[\\]{}\`_"']]).*$) # non-symbol
                 # The double dash may not be followed by other operator characters
                 # (then it would be an operator, not a comment)
    )
`,patterns:[{include:"#type_signature"}]},{name:"meta.declaration.pattern.haskell",begin:"^\\s*(pattern)\\b(?!')",captures:{1:{name:"keyword.other.pattern.haskell"}},end:`(?x) # Detect end of pattern type definition by decreasing indentation:
  (?=\\}|;)       # Explicit indentation
  |^(?!          # Implicit indentation: end match on newline *unless* the new line is either:
      \\1\\s+\\S    # - more indented, or
    | \\s*        # - starts with whitespace, followed by:
      (?: $      #   - the end of the line (i.e. empty line), or
      |\\{-[^@]   #   - the start of a block comment, or
      |--+       #   - the start of a single-line comment.
         (?![\\p{S}\\p{P}&&[^(),;\\[\\]{}\`_"']]).*$) # non-symbol
                 # The double dash may not be followed by other operator characters
                 # (then it would be an operator, not a comment)
    )
`,patterns:[{include:"$self"}]},{begin:`(?x)
  # Data declaration
  ^(\\s*)(data|newtype)(?:\\s+(family|instance))?\\s+
  # Keep consuming characters until:
  (((?!
  # the equals symbol or the start of a single-line comment, or
    (?: 
      (?<![\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']]) # non-symbol
      (?:=|--+)
      (?![\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']])  # non-symbol
    )
  # the "where" or "deriving" keywords, or
  | (?:\\b(?<!')(?:where|deriving)\\b(?!'))
  # the start of a block comment.
  | {-
  #
  ).)*)`,beginCaptures:{2:{name:"keyword.other.$2.haskell"},3:{name:"keyword.other.$3.haskell"},4:{patterns:[{include:"#type_signature"}]}},name:"meta.declaration.$2.algebraic.haskell",end:`(?x) # Detect end of data declaration: 
     # Decreasing indentation
   (?=\\}|;)      # Explicit indentation
   |^(?!          # Implicit indentation: end match on newline *unless* the new line is either:
       \\1\\s+\\S    # - more indented, or
     | \\s*        # - starts with whitespace, followed by:
       (?: $      #   - the end of the line (i.e. empty line), or
       |\\{-[^@]   #   - the start of a block comment, or
       |--+       #   - the start of a single-line comment.
          (?![\\p{S}\\p{P}&&[^(),;\\[\\]{}\`_"']]).*$) # non-symbol
                  # The double dash may not be followed by other operator characters
                  # (then it would be an operator, not a comment)
     )`,patterns:[{include:"#comment_like"},{include:"#deriving"},{include:"#forall"},{include:"#adt_constructor"},{include:"#context"},{include:"#record_decl"},{include:"#type_signature"}]},{name:"meta.declaration.type.family.haskell",begin:`(?x)
  # Type family
  ^(\\s*)(type)\\s+(family)\\b(?!')
  # Keep consuming characters until:
  (((?!
  # the equals symbol or the start of a single-line comment, or
    (?: 
      (?<![\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']]) # non-symbol
      (?:=|--+)
      (?![\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']])  # non-symbol
    )
  # the "where" keyword, or
  | \\b(?<!')where\\b(?!')
  # the start of a block comment.
  | {-
  #
  ).)*)`,beginCaptures:{2:{name:"keyword.other.type.haskell"},3:{name:"keyword.other.family.haskell"},4:{patterns:[{include:"#comment_like"},{include:"#where"},{include:"#type_signature"}]}},end:`(?x) # Detect end of type family by decreasing indentation:
  (?=\\}|;)       # Explicit indentation
  |^(?!          # Implicit indentation: end match on newline *unless* the new line is either:
      \\1\\s+\\S    # - more indented, or
    | \\s*        # - starts with whitespace, followed by:
      (?: $      #   - the end of the line (i.e. empty line), or
      |\\{-[^@]   #   - the start of a block comment, or
      |--+       #   - the start of a single-line comment.
         (?![\\p{S}\\p{P}&&[^(),;\\[\\]{}\`_"']]).*$) # non-symbol
                 # The double dash may not be followed by other operator characters
                 # (then it would be an operator, not a comment)
    )
`,patterns:[{include:"#comment_like"},{include:"#where"},{include:"#type_signature"}]},{name:"meta.declaration.type.haskell",begin:`(?x)
  # Type declaration
  ^(\\s*)(type)(?:\\s+(instance))?\\s+
  # Keep consuming characters until:
  (((?!
  # the equals symbol, the start of a single-line comment, or a type signature
    (?: 
      (?<![\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']]) # non-symbol
      (?:=|--+|::|∷)
      (?![\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']])  # non-symbol
    )
  # the start of a block comment.
  | {-
  #
  ).)*)`,beginCaptures:{2:{name:"keyword.other.type.haskell"},3:{name:"keyword.other.instance.haskell"},4:{patterns:[{include:"#type_signature"}]}},end:`(?x) # Detect end of type definition by decreasing indentation:
  (?=\\}|;)       # Explicit indentation
  |^(?!          # Implicit indentation: end match on newline *unless* the new line is either:
      \\1\\s+\\S    # - more indented, or
    | \\s*        # - starts with whitespace, followed by:
      (?: $      #   - the end of the line (i.e. empty line), or
      |\\{-[^@]   #   - the start of a block comment, or
      |--+       #   - the start of a single-line comment.
         (?![\\p{S}\\p{P}&&[^(),;\\[\\]{}\`_"']]).*$) # non-symbol
                 # The double dash may not be followed by other operator characters
                 # (then it would be an operator, not a comment)
    )
`,patterns:[{include:"#type_signature"}]},{begin:"^(\\s*)(instance)(\\b(?!'))",beginCaptures:{2:{name:"keyword.other.instance.haskell"}},end:`(?x) # Detect end of instance declaration:
  # 'where' keyword
  (?=\\b(?<!')(where)\\b(?!'))
  # Decreasing indentation
  |(?=\\}|;)      # Explicit indentation
  |^(?!          # Implicit indentation: end match on newline *unless* the new line is either:
      \\1\\s+\\S    # - more indented, or
    | \\s*        # - starts with whitespace, followed by:
      (?: $      #   - the end of the line (i.e. empty line), or
      |\\{-[^@]   #   - the start of a block comment, or
      |--+       #   - the start of a single-line comment.
         (?![\\p{S}\\p{P}&&[^(),;\\[\\]{}\`_"']]).*$) # non-symbol
                 # The double dash may not be followed by other operator characters
                 # (then it would be an operator, not a comment)
    )
`,name:"meta.declaration.instance.haskell",patterns:[{include:"#comment_like"},{include:"#where"},{include:"#type_signature"}]},{begin:"^(\\s*)(import)(\\b(?!'))",beginCaptures:{2:{name:"keyword.other.import.haskell"}},end:`(?x) # Detect end of import
  # 'where' keyword
  (?=\\b(?<!')(where)\\b(?!'))
  # Decreasing indentation
  |(?=\\}|;)      # Explicit indentation
  |^(?!          # Implicit indentation: end match on newline *unless* the new line is either:
      \\1\\s+\\S    # - more indented, or
    | \\s*        # - starts with whitespace, followed by:
      (?: $      #   - the end of the line (i.e. empty line), or
      |\\{-[^@]   #   - the start of a block comment, or
      |--+       #   - the start of a single-line comment.
         (?![\\p{S}\\p{P}&&[^(),;\\[\\]{}\`_"']]).*$) # non-symbol
                 # The double dash may not be followed by other operator characters
                 # (then it would be an operator, not a comment)
    )
`,name:"meta.import.haskell",patterns:[{include:"#comment_like"},{include:"#where"},{match:"(qualified|as|hiding)",captures:{1:{name:"keyword.other.$1.haskell"}}},{include:"#module_name"},{include:"#module_exports"}]},{include:"#deriving"},{include:"#layout_herald"},{include:"#keyword"},{match:"^\\s*(infix[lr]?)\\s+(.*)",captures:{1:{name:"keyword.other.$1.haskell"},2:{patterns:[{include:"#comment_like"},{include:"#integer_literals"},{include:"#infix_op"}]}},name:"meta.fixity-declaration.haskell"},{include:"#overloaded_label"},{include:"#type_application"},{include:"#reserved_symbol"},{include:"#fun_decl"},{include:"#qualifier"},{include:"#data_constructor"},{include:"#start_type_signature"},{include:"#prefix_op"},{include:"#infix_op"},{begin:"(\\()(#)\\s",end:"(#)(\\))",beginCaptures:{1:{name:"punctuation.paren.haskell"},2:{name:"keyword.operator.hash.haskell"}},endCaptures:{1:{name:"keyword.operator.hash.haskell"},2:{name:"punctuation.paren.haskell"}},patterns:[{include:"#comma"},{include:"$self"}]},{begin:"(\\()",end:"(\\))",beginCaptures:{1:{name:"punctuation.paren.haskell"}},endCaptures:{1:{name:"punctuation.paren.haskell"}},patterns:[{include:"#comma"},{include:"$self"}]},{include:"#quasi_quote"},{begin:"(\\[)",end:"(\\])",beginCaptures:{1:{name:"punctuation.bracket.haskell"}},endCaptures:{1:{name:"punctuation.bracket.haskell"}},patterns:[{include:"#comma"},{include:"$self"}]},{include:"#record"}],repository:{block_comment:{applyEndPatternLast:1,begin:"\\{-",captures:{0:{name:"punctuation.definition.comment.haskell"}},end:"-\\}",name:"comment.block.haskell",patterns:[{include:"#block_comment"}]},comments:{patterns:[{begin:"^(\\s*)(--\\s[\\|\\$])",beginCaptures:{2:{name:"punctuation.whitespace.comment.leading.haskell"}},end:"(?=^(?!\\1--+(?![\\p{S}\\p{P}&&[^(),;\\[\\]`{}_\"']])))",name:"comment.block.documentation.haskell"},{begin:"(^[ \\t]+)?(--\\s[\\^\\*])",beginCaptures:{1:{name:"punctuation.whitespace.comment.leading.haskell"}},end:"\\n",name:"comment.line.documentation.haskell"},{applyEndPatternLast:1,begin:"\\{-\\s?[\\|\\$\\*\\^]",captures:{0:{name:"punctuation.definition.comment.haskell"}},end:"-\\}",name:"comment.block.documentation.haskell",patterns:[{include:"#block_comment"}]},{begin:"(^[ \\t]+)?(?=--+(?![\\p{S}\\p{P}&&[^(),;\\[\\]`{}_\"']]))",beginCaptures:{1:{name:"punctuation.whitespace.comment.leading.haskell"}},comment:"Operators may begin with '--' as long as they are not entirely composed of '-' characters. This means comments can't be immediately followed by an allowable operator character.",end:"(?!\\G)",patterns:[{begin:"--",beginCaptures:{0:{name:"punctuation.definition.comment.haskell"}},end:"\\n",name:"comment.line.double-dash.haskell"}]},{include:"#block_comment"}]},comment_like:{patterns:[{include:"#cpp"},{include:"#pragma"},{include:"#comments"}]},cpp:{captures:{1:{name:"punctuation.definition.preprocessor.c"}},comment:`In addition to Haskell's "native" syntax, GHC permits the C preprocessor to be run on a source file.`,match:"^(#).*$",name:"meta.preprocessor.c"},where:{patterns:[{begin:`(?x)
  (?<!')\\b(where)
  \\s*(\\{)(?!-)`,end:"(\\})",beginCaptures:{1:{name:"keyword.other.where.haskell"},2:{name:"punctuation.brace.haskell"}},endCaptures:{1:{name:"punctuation.brace.haskell"}},patterns:[{include:"$self"},{match:";",name:"punctuation.semicolon.haskell"}]},{match:"\\b(?<!')(where)\\b(?!')",name:"keyword.other.where.haskell"}]},layout_herald:{begin:`(?x)
  (?<!')\\b(?:(where|let|m?do)|(of))
  \\s*(\\{)(?!-)`,end:"(\\})",beginCaptures:{1:{name:"keyword.other.$1.haskell"},2:{name:"keyword.control.of.haskell"},3:{name:"punctuation.brace.haskell"}},endCaptures:{1:{name:"punctuation.brace.haskell"}},patterns:[{include:"$self"},{match:";",name:"punctuation.semicolon.haskell"}]},keyword:{match:"\\b(?<!')(?:(where|let|in|default)|(m?do|if|then|else|case|of|proc|rec))\\b(?!')",captures:{1:{name:"keyword.other.$1.haskell"},2:{name:"keyword.control.$2.haskell"}}},deriving:{patterns:[{begin:"^(\\s*)(deriving)\\s+(?:(via|stock|newtype|anyclass)\\s+)?",beginCaptures:{2:{name:"keyword.other.deriving.haskell"},3:{name:"keyword.other.deriving.strategy.$3.haskell"}},end:`(?x) # Detect end of deriving statement
  # Decreasing indentation
   (?=\\}|;)      # Explicit indentation
  |^(?!          # Implicit indentation: end match on newline *unless* the new line is either:
      \\1\\s+\\S    # - more indented, or
    | \\s*        # - starts with whitespace, followed by:
      (?: $      #   - the end of the line (i.e. empty line), or
      |\\{-[^@]   #   - the start of a block comment, or
      |--+       #   - the start of a single-line comment.
         (?![\\p{S}\\p{P}&&[^(),;\\[\\]{}\`_"']]).*$) # non-symbol
                 # The double dash may not be followed by other operator characters
                 # (then it would be an operator, not a comment)
    )`,patterns:[{include:"#comment_like"},{match:"(?<!')\\b(instance)\\b(?!')",name:"keyword.other.instance.haskell"},{match:"(?<!')\\b(via|stock|newtype|anyclass)\\b(?!')",captures:{1:{name:"keyword.other.deriving.strategy.$1.haskell"}}},{include:"#type_signature"}],name:"meta.deriving.haskell"},{begin:"(deriving)(?:\\s+(stock|newtype|anyclass))?\\s*(\\()",beginCaptures:{1:{name:"keyword.other.deriving.haskell"},2:{name:"keyword.other.deriving.strategy.$2.haskell"},3:{name:"punctuation.paren.haskell"}},end:"(\\))",endCaptures:{1:{name:"punctuation.paren.haskell"}},name:"meta.deriving.haskell",patterns:[{include:"#type_signature"}]},{match:`(?x)
  (deriving)(?:\\s+(stock|newtype|anyclass))?\\s+
    ([\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)
    (\\s+(via)\\s+(.*)$)?
`,captures:{1:{name:"keyword.other.deriving.haskell"},2:{name:"keyword.other.deriving.strategy.$2.haskell"},3:{patterns:[{include:"#type_signature"}]},5:{name:"keyword.other.deriving.strategy.via.haskell"},6:{patterns:[{include:"#type_signature"}]}},name:"meta.deriving.haskell"},{match:"(?<!')\\b(via)\\b(?!')",name:"keyword.other.deriving.strategy.via.haskell"}]},prefix_op:{patterns:[{comment:`An operator cannot be composed entirely of '-' characters;  instead, it should be matched as a comment.
`,match:`(?x)
  (\\()\\s*(?!(?:--+|\\.\\.)\\))(\\#+|[\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']]+(?<!\\#))\\s*(\\))`,captures:{1:{name:"punctuation.paren.haskell"},2:{name:"entity.name.function.infix.haskell"},3:{name:"punctuation.paren.haskell"}}}]},infix_op:{patterns:[{match:`(?x)
  ((?:(?<!'')('')?[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}'']*\\.)*)
    (\\#+|[\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']]+(?<!\\#))`,comment:`In case this regex seems overly general, note that Haskell permits  the definition of new operators which can be nearly any string of  punctuation characters, such as $%^&*.
`,captures:{1:{name:"keyword.operator.promotion.haskell"},2:{name:"entity.name.namespace.haskell"},3:{name:"keyword.operator.infix.haskell"}}},{match:"(`)((?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}'']*\\.)*)([\\p{Ll}\\p{Lu}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}'']*)(`)",captures:{1:{name:"punctuation.backtick.haskell"},2:{name:"entity.name.namespace.haskell"},3:{patterns:[{include:"#data_constructor"}]},4:{name:"punctuation.backtick.haskell"}},comment:`In case this regex seems unusual for an infix operator, note that Haskell
allows any ordinary function application (elem 4 [1..10]) to be rewritten
as an infix expression (4 \`elem\` [1..10]).
`,name:"keyword.operator.function.infix.haskell"}]},module_exports:{begin:"\\(",beginCaptures:{0:{name:"punctuation.paren.haskell"}},end:"\\)",endCaptures:{0:{name:"punctuation.paren.haskell"}},applyEndPatternLast:1,name:"meta.declaration.exports.haskell",patterns:[{include:"#comment_like"},{match:"\\b(?<!')(module)\\b(?!')",captures:{1:{name:"keyword.other.module.haskell"}}},{include:"#comma"},{include:"#export_constructs"},{begin:"\\(",beginCaptures:{0:{name:"punctuation.paren.haskell"}},end:"\\)",endCaptures:{0:{name:"punctuation.paren.haskell"}},patterns:[{include:"#comment_like"},{include:"#record_wildcard"},{include:"#export_constructs"},{include:"#comma"}]}]},export_constructs:{patterns:[{include:"#comment_like"},{begin:"\\b(?<!')(pattern)\\b(?!')",beginCaptures:{1:{name:"keyword.other.pattern.haskell"}},end:`(?x)
   # Data constructor
   ([\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)
   # Prefix form of symbolic constructor
   | (\\()\\s*(:[\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']]+)\\s*(\\))`,endCaptures:{1:{name:"constant.other.haskell"},2:{name:"punctuation.paren.haskell"},3:{name:"constant.other.operator.haskell"},4:{name:"punctuation.paren.haskell"}},patterns:[{include:"#comment_like"}]},{begin:"\\b(?<!')(type)\\b(?!')",beginCaptures:{1:{name:"keyword.other.type.haskell"}},end:`(?x)
   # Type name
   ([\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)
   # Prefix form of type operator
   | (\\()\\s*([\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']]+)\\s*(\\))`,endCaptures:{1:{name:"storage.type.haskell"},2:{name:"punctuation.paren.haskell"},3:{name:"storage.type.operator.haskell"},4:{name:"punctuation.paren.haskell"}},patterns:[{include:"#comment_like"}]},{match:"(?<!')\\b[\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*",name:"entity.name.function.haskell"},{match:"(?<!')\\b[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*",name:"storage.type.haskell"},{include:"#record_wildcard"},{include:"#reserved_symbol"},{include:"#prefix_op"}]},comma:{match:",",name:"punctuation.separator.comma.haskell"},module_name:{match:"(?<conid>[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(\\.\\g<conid>)?)",name:"entity.name.namespace.haskell"},pragma:{begin:"\\{-#",end:"#-\\}",name:"meta.preprocessor.haskell",patterns:[{begin:"(?xi) \\b(?<!')(LANGUAGE)\\b(?!')",end:"(?=#-\\})",beginCaptures:{1:{name:"keyword.other.preprocessor.pragma.haskell"}},patterns:[{match:`(?x)
  (?:No)?
  (?:AutoDeriveTypeable|DatatypeContexts|DoRec|IncoherentInstances|MonadFailDesugaring|MonoPatBinds|NullaryTypeClasses|OverlappingInstances|PatternSignatures|RecordPuns|RelaxedPolyRec)`,name:"invalid.deprecated"},{match:`(?x)
  (
  (?:No)?
  (?:AllowAmbiguousTypes|AlternativeLayoutRule|AlternativeLayoutRuleTransitional|Arrows|BangPatterns|BinaryLiterals|CApiFFI|CPP|CUSKs|ConstrainedClassMethods|ConstraintKinds|DataKinds|DefaultSignatures|DeriveAnyClass|DeriveDataTypeable|DeriveFoldable|DeriveFunctor|DeriveGeneric|DeriveLift|DeriveTraversable|DerivingStrategies|DerivingVia|DisambiguateRecordFields|DoAndIfThenElse|BlockArguments|DuplicateRecordFields|EmptyCase|EmptyDataDecls|EmptyDataDeriving|ExistentialQuantification|ExplicitForAll|ExplicitNamespaces|ExtendedDefaultRules|FlexibleContexts|FlexibleInstances|ForeignFunctionInterface|FunctionalDependencies|GADTSyntax|GADTs|GHCForeignImportPrim|Generali(?:s|z)edNewtypeDeriving|ImplicitParams|ImplicitPrelude|ImportQualifiedPost|ImpredicativeTypes|TypeFamilyDependencies|InstanceSigs|ApplicativeDo|InterruptibleFFI|JavaScriptFFI|KindSignatures|LambdaCase|LiberalTypeSynonyms|MagicHash|MonadComprehensions|MonoLocalBinds|MonomorphismRestriction|MultiParamTypeClasses|MultiWayIf|NumericUnderscores|NPlusKPatterns|NamedFieldPuns|NamedWildCards|NegativeLiterals|HexFloatLiterals|NondecreasingIndentation|NumDecimals|OverloadedLabels|OverloadedLists|OverloadedStrings|PackageImports|ParallelArrays|ParallelListComp|PartialTypeSignatures|PatternGuards|PatternSynonyms|PolyKinds|PolymorphicComponents|QuantifiedConstraints|PostfixOperators|QuasiQuotes|Rank2Types|RankNTypes|RebindableSyntax|RecordWildCards|RecursiveDo|RelaxedLayout|RoleAnnotations|ScopedTypeVariables|StandaloneDeriving|StarIsType|StaticPointers|Strict|StrictData|TemplateHaskell|TemplateHaskellQuotes|StandaloneKindSignatures|TraditionalRecordSyntax|TransformListComp|TupleSections|TypeApplications|TypeInType|TypeFamilies|TypeOperators|TypeSynonymInstances|UnboxedTuples|UnboxedSums|UndecidableInstances|UndecidableSuperClasses|UnicodeSyntax|UnliftedFFITypes|UnliftedNewtypes|ViewPatterns)
  )`,captures:{1:{name:"keyword.other.preprocessor.extension.haskell"}}},{include:"#comma"}]},{begin:`(?xi)
  \\b(?<!')(SPECIALI(?:S|Z)E)
  (?:
  \\s*( \\[ [^\\[\\]]* \\])?\\s*
  |\\s+
  )
  (instance)\\b(?!')`,end:"(?=#-\\})",beginCaptures:{1:{name:"keyword.other.preprocessor.pragma.haskell"},2:{patterns:[{include:"#inline_phase"}]},3:{name:"keyword.other.instance.haskell"}},patterns:[{include:"#type_signature"}]},{begin:`(?xi)
  \\b(?<!')(SPECIALI(?:S|Z)E)\\b(?!')
  (?:\\s+(INLINE)\\b(?!'))?
  (?:\\s*(\\[ [^\\[\\]]* \\])?)
  \\s*`,end:"(?=#-\\})",beginCaptures:{1:{name:"keyword.other.preprocessor.pragma.haskell"},2:{name:"keyword.other.preprocessor.pragma.haskell"},3:{patterns:[{include:"#inline_phase"}]}},patterns:[{include:"$self"}]},{match:`(?xi) \\b(?<!')
  (LANGUAGE|OPTIONS_GHC|INCLUDE
  |MINIMAL|UNPACK|OVERLAPS|INCOHERENT
  |NOUNPACK|SOURCE|OVERLAPPING|OVERLAPPABLE|INLINE
  |NOINLINE|INLINE?ABLE|CONLIKE|LINE|COLUMN|RULES
  |COMPLETE)\\b(?!')`,name:"keyword.other.preprocessor.haskell"},{begin:"(?i)\\b(DEPRECATED|WARNING)\\b",beginCaptures:{1:{name:"keyword.other.preprocessor.pragma.haskell"}},end:"(?=#-\\})",patterns:[{include:"#string_literal"}]}]},liquid_haskell:{name:"block.liquidhaskell.haskell",begin:"\\{-@",end:"@-\\}",patterns:[{include:"$self"}]},context:{match:`(?x)
  (.*)
  (?<![\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']])
  (=>|⇒)
  (?![\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']])
`,captures:{1:{patterns:[{include:"#comment_like"},{include:"#type_signature"}]},2:{name:"keyword.operator.big-arrow.haskell"}}},data_constructor:{match:"\\b(?<!')[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*(?![\\.'\\w])",name:"constant.other.haskell"},qualifier:{match:"\\b(?<!')[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*\\.",name:"entity.name.namespace.haskell"},record_decl:{begin:"({)(?!-)",beginCaptures:{1:{name:"punctuation.brace.haskell"}},end:"(?<!-)(})",endCaptures:{1:{name:"punctuation.brace.haskell"}},name:"meta.record.definition.haskell",patterns:[{include:"#comment_like"},{include:"#record_decl_field"}]},record:{begin:"({)(?!-)",beginCaptures:{1:{name:"punctuation.brace.haskell"}},end:"(?<!-)(})",endCaptures:{1:{name:"punctuation.brace.haskell"}},name:"meta.record.haskell",patterns:[{include:"#comment_like"},{include:"#record_field"}]},record_decl_field:{begin:`(?x)
  (?:([\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)
    |(\\()\\s*([\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']]+)\\s*(\\))
  )
`,end:"(,)|(?=})",beginCaptures:{1:{name:"variable.other.member.definition.haskell"},2:{name:"punctuation.paren.haskell"},3:{name:"variable.other.member.definition.haskell"},4:{name:"punctuation.paren.haskell"}},endCaptures:{1:{name:"punctuation.comma.haskell"}},patterns:[{include:"#comment_like"},{include:"#comma"},{include:"#double_colon"},{include:"#type_signature"},{include:"#record_decl_field"}]},record_wildcard:{match:`(?x)
  (?<![\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']])
  (\\.\\.)
  (?![\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']])`,captures:{1:{name:"variable.other.member.wildcard.haskell"}}},record_field:{patterns:[{begin:`(?x)
  (?:([\\p{Ll}\\p{Lu}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}\\.']*)
    |(\\()\\s*([\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']]+)\\s*(\\))
  )
`,end:"(,)|(?=})",beginCaptures:{1:{name:"variable.other.member.haskell",patterns:[{include:"#qualifier"}]},2:{name:"punctuation.paren.haskell"},3:{name:"variable.other.member.haskell"},4:{name:"punctuation.paren.haskell"}},endCaptures:{1:{name:"punctuation.comma.haskell"}},patterns:[{include:"#comment_like"},{include:"#comma"},{include:"$self"}]},{include:"#record_wildcard"}]},role_annotation:{patterns:[{begin:"^(\\s*)(type)\\s+(role)\\b(?!')",beginCaptures:{2:{name:"keyword.other.type.haskell"},3:{name:"keyword.other.role.haskell"}},end:`(?x) # Detect end of block by decreasing indentation:
  (?=\\}|;)       # Explicit indentation
  |^(?!          # Implicit indentation: end match on newline *unless* the new line is either:
      \\1\\s+\\S    # - more indented, or
    | \\s*        # - starts with whitespace, followed by:
      (?: $      #   - the end of the line (i.e. empty line), or
      |\\{-[^@]   #   - the start of a block comment, or
      |--+       #   - the start of a single-line comment.
         (?![\\p{S}\\p{P}&&[^(),;\\[\\]{}\`_"']]).*$) # non-symbol
                 # The double dash may not be followed by other operator characters
                 # (then it would be an operator, not a comment)
    )`,name:"meta.role-annotation.haskell",patterns:[{include:"#comment_like"},{include:"#type_constructor"},{match:"\\b(?<!')(nominal|representational|phantom)\\b(?!')",captures:{1:{name:"keyword.other.role.$1.haskell"}}}]}]},fun_decl:{begin:`(?x)^(\\s*)
  (?<fn>
    (?:
      [\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*\\#*
    | \\(\\s*
        (?!--+\\))
        [\\p{S}\\p{P}&&[^(),:;\\[\\]\`{}_"']]
        [\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']]*
      \\s*\\)
    )
    (?:\\s*,\\s*\\g<fn>)?
  )
  \\s*(?<![\\p{S}\\p{P}&&[^\\),;\\]\`}_"']])(::|∷)(?![\\p{S}\\p{P}&&[^\\(,;\\[\`{_"']])
`,beginCaptures:{2:{name:"entity.name.function.haskell",patterns:[{include:"#reserved_symbol"},{include:"#prefix_op"}]},3:{name:"keyword.operator.double-colon.haskell"}},name:"meta.function.type-declaration.haskell",patterns:[{include:"#type_signature"}],end:`(?x)
  # End of type annotation:
    # To the left of a reserved symbolic keyword such as = or <-
  (?= 
      # non-symbolic character
      (?<![\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']])
      # symbolic keyword except (->)
      ((<-|←)|(=)|(-<|↢)|(-<<|⤛))
      # non-symbolic character
      ([(),;\\[\\]\`{}_"']|[^\\p{S}\\p{P}])
  )
  # Decreasing indentation:
  |(?=\\}|;)      # Explicit indentation
  |^(?!          # Implicit indentation: end match on newline *unless* the new line is either:
      \\1\\s+\\S    # - more indented, or
    | \\s*        # - starts with whitespace, followed by:
      (?: $      #   - the end of the line (i.e. empty line), or
      |\\{-[^@]   #   - the start of a block comment, or
      |--+       #   - the start of a single-line comment.
         (?![\\p{S}\\p{P}&&[^(),;\\[\\]{}\`_"']]).*$) # non-symbol
                 # The double dash may not be followed by other operator characters
                 # (then it would be an operator, not a comment)
    )
`},adt_constructor:{patterns:[{include:"#comment_like"},{begin:`(?x)
  (?<![\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']]) # non-symbol
  (?:(=)|(\\|))
  (?![\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']])  # non-symbol`,beginCaptures:{1:{name:"keyword.operator.eq.haskell"},2:{name:"keyword.operator.pipe.haskell"}},end:`(?x)
  (?:\\G|^)\\s* # Enforce starting condition to avoid catastrophic backtracking (https://github.com/JustusAdam/language-haskell/issues/161)
  (?: # Infix data constructor
    # First argument
    (?:
    # Simple type
      (?<!')\\b((?:[\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}'\\.])+)
    # Type inside balanced parentheses
    | ('? # Optional promotion tick
        (?<paren>
          \\(          # Opening parenthesis
          (?:
            [^\\(\\)]*  # Match non-parentheses
          | \\g<paren> # or recurse into further depth
          )*
          \\)          # Closing parenthesis
        )
      )
    # Type inside balanced brackets
    | ('? # Optional promotion tick
        (?<brac>
          \\(          # Opening bracket
          (?:
            [^\\[\\]]*  # Match non-brackets
          | \\g<brac>  # or recurse into further depth
          )*
          \\]          # Closing bracket
        )
      )
    )        
    # Then either
    \\s*
      # - a symbolic infix constructor, or
    (?:(?<![\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']])(:[\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']]*)
      # - an alphabetic infix constructor
    | (\`)([\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)(\`)
    )

  ) # Otherwise, prefix data constructor, either:
  | # - an alphabetic data constructor e.g. "Cons_123"
    (?:(?<!')\\b([\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*))
  | # - a symbolic (prefix) data constructor
    (\\()\\s*(:[\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']]*)\\s*(\\))`,endCaptures:{1:{patterns:[{include:"#type_signature"}]},2:{patterns:[{include:"#type_signature"}]},4:{patterns:[{include:"#type_signature"}]},6:{name:"constant.other.operator.haskell"},7:{name:"punctuation.backtick.haskell"},8:{name:"constant.other.haskell"},9:{name:"punctuation.backtick.haskell"},10:{name:"constant.other.haskell"},11:{name:"punctuation.paren.haskell"},12:{name:"constant.other.operator.haskell"},13:{name:"punctuation.paren.haskell"}},patterns:[{include:"#comment_like"},{include:"#deriving"},{include:"#record_decl"},{include:"#forall"},{include:"#context"}]}]},gadt_constructor:{patterns:[{begin:`(?x)
   ^(\\s*)
      (?:
        (\\b(?<!')[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)
      |(\\()\\s*(:[\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']]*)\\s*(\\))
      )`,beginCaptures:{2:{name:"constant.other.haskell"},3:{name:"punctuation.paren.haskell"},4:{name:"constant.other.operator.haskell"},5:{name:"punctuation.paren.haskell"}},end:`(?x)
  # GADT constructor ends
  (?=\\b(?<!'')deriving\\b(?!'))  
        # Decreasing indentation
  |(?=\\}|;)      # Explicit indentation
  |^(?!          # Implicit indentation: end match on newline *unless* the new line is either:
      \\1\\s+\\S    # - more indented, or
    | \\s*        # - starts with whitespace, followed by:
      (?: $      #   - the end of the line (i.e. empty line), or
      |\\{-[^@]   #   - the start of a block comment, or
      |--+       #   - the start of a single-line comment.
         (?![\\p{S}\\p{P}&&[^(),;\\[\\]{}\`_"']]).*$) # non-symbol
                 # The double dash may not be followed by other operator characters
                 # (then it would be an operator, not a comment)
    )
`,patterns:[{include:"#comment_like"},{include:"#deriving"},{include:"#double_colon"},{include:"#record_decl"},{include:"#type_signature"}]},{begin:`(?x)
  (\\b(?<!')[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}]*) # named constructor
 |(\\()\\s*(:[\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']]*)\\s*(\\))    # prefix operator`,beginCaptures:{1:{name:"constant.other.haskell"},2:{name:"punctuation.paren.haskell"},3:{name:"constant.other.operator.haskell"},4:{name:"punctuation.paren.haskell"}},end:"$",patterns:[{include:"#comment_like"},{include:"#deriving"},{include:"#double_colon"},{include:"#record_decl"},{include:"#type_signature"}]}]},type_application:{patterns:[{begin:`(?<=[\\s,;\\[\\]{}"])(@)(')?(\\()`,beginCaptures:{1:{name:"keyword.operator.prefix.at.haskell"},2:{name:"keyword.operator.promotion.haskell"},3:{name:"punctuation.paren.haskell"}},end:"\\)",endCaptures:{0:{name:"punctuation.paren.haskell"}},name:"meta.type-application.haskell",patterns:[{include:"#type_signature"}]},{begin:`(?<=[\\s,;\\[\\]{}"])(@)(')?(\\[)`,beginCaptures:{1:{name:"keyword.operator.prefix.at.haskell"},2:{name:"keyword.operator.promotion.haskell"},3:{name:"punctuation.bracket.haskell"}},end:"\\]",name:"meta.type-application.haskell",endCaptures:{0:{name:"punctuation.bracket.haskell"}},patterns:[{include:"#type_signature"}]},{begin:'(?<=[\\s,;\\[\\]{}"])(@)(?=\\")',beginCaptures:{1:{name:"keyword.operator.prefix.at.haskell"}},end:'(?<=\\")',name:"meta.type-application.haskell",patterns:[{include:"#string_literal"}]},{begin:`(?<=[\\s,;\\[\\]{}"])(@)(?=[\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}'])`,beginCaptures:{1:{name:"keyword.operator.prefix.at.haskell"}},end:"(?![\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}'])",name:"meta.type-application.haskell",patterns:[{include:"#type_signature"}]}]},type_signature:{patterns:[{include:"#comment_like"},{match:"(')?(\\()\\s*(\\))",captures:{1:{name:"keyword.operator.promotion.haskell"},2:{name:"punctuation.paren.haskell"},3:{name:"punctuation.paren.haskell"}},name:"support.constant.unit.haskell"},{match:"(\\()(#)\\s*(#)(\\))",name:"support.constant.unit.unboxed.haskell",captures:{1:{name:"punctuation.paren.haskell"},2:{name:"keyword.operator.hash.haskell"},3:{name:"keyword.operator.hash.haskell"},4:{name:"punctuation.paren.haskell"}}},{match:"(')?(\\()\\s*,[\\s,]*(\\))",captures:{1:{name:"keyword.operator.promotion.haskell"},2:{name:"punctuation.paren.haskell"},3:{name:"punctuation.paren.haskell"}},name:"support.constant.tuple.haskell"},{match:"(\\()(#)\\s*(#)(\\))",name:"support.constant.unit.unboxed.haskell",captures:{1:{name:"punctuation.paren.haskell"},2:{name:"keyword.operator.hash.haskell"},3:{name:"keyword.operator.hash.haskell"},4:{name:"punctuation.paren.haskell"}}},{match:"(\\()(#)\\s*,[\\s,]*(#)(\\))",captures:{1:{name:"punctuation.paren.haskell"},2:{name:"keyword.operator.hash.haskell"},3:{name:"keyword.operator.hash.haskell"},4:{name:"punctuation.paren.haskell"}},name:"support.constant.tuple.unboxed.haskell"},{match:"(')?(\\[)\\s*(\\])",captures:{1:{name:"keyword.operator.promotion.haskell"},2:{name:"punctuation.bracket.haskell"},3:{name:"punctuation.bracket.haskell"}},name:"support.constant.empty-list.haskell"},{include:"#integer_literals"},{match:"(::|∷)(?![\\p{S}\\p{P}&&[^(),;\\[\\]`{}_\"']])",name:"keyword.operator.double-colon.haskell"},{include:"#forall"},{match:"=>|⇒",name:"keyword.operator.big-arrow.haskell"},{include:"#string_literal"},{match:"'[^']'",name:"invalid"},{include:"#type_application"},{include:"#reserved_symbol"},{include:"#type_operator"},{include:"#type_constructor"},{begin:"(\\()(#)",end:"(#)(\\))",beginCaptures:{1:{name:"punctuation.paren.haskell"},2:{name:"keyword.operator.hash.haskell"}},endCaptures:{1:{name:"keyword.operator.hash.haskell"},2:{name:"punctuation.paren.haskell"}},patterns:[{include:"#comma"},{include:"#type_signature"}]},{begin:"(')?(\\()",end:"(\\))",beginCaptures:{1:{name:"keyword.operator.promotion.haskell"},2:{name:"punctuation.paren.haskell"}},endCaptures:{1:{name:"punctuation.paren.haskell"}},patterns:[{include:"#comma"},{include:"#type_signature"}]},{begin:"(')?(\\[)",end:"(\\])",beginCaptures:{1:{name:"keyword.operator.promotion.haskell"},2:{name:"punctuation.bracket.haskell"}},endCaptures:{1:{name:"punctuation.bracket.haskell"}},patterns:[{include:"#comma"},{include:"#type_signature"}]},{include:"#type_variable"}]},double_colon:{match:"\\s*(::|∷)(?![\\p{S}\\p{P}&&[^(),;\\[\\]`{}_\"']])\\s*",captures:{1:{name:"keyword.operator.double-colon.haskell"}}},start_type_signature:{patterns:[{begin:"^(\\s*)(::|∷)(?![\\p{S}\\p{P}&&[^\\(,;\\[`{_\"']])\\s*",beginCaptures:{2:{name:"keyword.operator.double-colon.haskell"}},end:`(?x)
  # End type annotation when seeing one of:
  (?=
    \\#?\\)                             # closing parenthesis
    |\\]                               # closing bracket
    |,                                # comma
    |(?<!')\\b(in|then|else|of)\\b(?!') # keyword
    |                                 # symbolic keyword except (->)
      (?<![\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']])
      (?:
         (\\\\|λ)
        |(<-|←)
        |(=)
        |(-<|↢)
        |(-<<|⤛)
      )
      ([(),;\\[\\]\`{}_"']|[^\\p{S}\\p{P}])
    |(\\#|@)-\\}                             # End of annotation block (LiquidHaskell or pragma)
    # Decreasing indentation:
    | (?=\\}|;)     # Explicit indentation
    |^(?!          # Implicit indentation: end match on newline *unless* the new line is either:
        \\1\\s*\\S    # - equally indented, or
      | \\s*        # - starts with whitespace, followed by:
        (?: $      #   - the end of the line (i.e. empty line), or
        |\\{-[^@]   #   - the start of a block comment, or
        |--+       #   - the start of a single-line comment.
           (?![\\p{S}\\p{P}&&[^(),;\\[\\]{}\`_"']]).*$) # non-symbol
                   # The double dash may not be followed by other operator characters
                   # (then it would be an operator, not a comment)
      )
  )`,patterns:[{include:"#type_signature"}],name:"meta.type-declaration.haskell"},{begin:"(?<![\\p{S}\\p{P}&&[^\\(,;\\[`{_\"']])(::|∷)(?![\\p{S}\\p{P}&&[^\\(,;\\[`{_\"']])",beginCaptures:{1:{name:"keyword.operator.double-colon.haskell"}},end:`(?x)
  # End type annotation when seeing one of:
  (?=
    \\#?\\)                             # closing parenthesis
    |\\]                               # closing bracket
    |,                                # comma
    |\\b(?<!')(in|then|else|of)\\b(?!') # keyword
    |(\\#|@)-\\}                        # End of annotation block (LiquidHaskell or pragma)
    |                                 # symbolic keyword except (->)
      (?<![\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']])
      (?:
         (\\\\|λ)
        |(<-|←)
        |(=)
        |(-<|↢)
        |(-<<|⤛)
      )
      ([(),;\\[\\]\`{}_"']|[^\\p{S}\\p{P}])
    # Indentation 
    |(?=\\}|;)      # Explicit indentation
    |$             # End of line
  )`,patterns:[{include:"#type_signature"}]}]},type_variable:{match:"\\b(?<!')(?!(?:forall|deriving)\\b(?!'))[\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*",name:"variable.other.generic-type.haskell"},type_constructor:{patterns:[{match:`(?x)
  # Optional promotion tick
    (')?
  # Optional qualified name
    ((?:\\b[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*\\.)*)
  # Type constructor proper
    (\\b[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)`,captures:{1:{name:"keyword.operator.promotion.haskell"},2:{name:"entity.name.namespace.haskell"},3:{name:"storage.type.haskell"}}},{match:`(?x)
  # Optional promotion tick
    (')?
  # Opening parenthesis
    (\\()\\s*
  # Optional qualified name
    ((?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*\\.)*)
  # Type operator proper
    ([\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']]+)
  # Closing parenthesis
    \\s*(\\))`,captures:{1:{name:"keyword.operator.promotion.haskell"},2:{name:"punctuation.paren.haskell"},3:{name:"entity.name.namespace.haskell"},4:{name:"storage.type.operator.haskell"},5:{name:"punctuation.paren.haskell"}}}]},overloaded_label:{patterns:[{match:`(?x) 
  (?<![\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}\\p{S}\\p{P}&&[^(,;\\[\`{]]) # Disallow closing characters
  (\\#)
    (?:
    # String
    ("(?:\\\\"|[^"])*")
    # Sequence of allowed label identifiers
    |[\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}'\\.]+
    )`,captures:{1:{name:"keyword.operator.prefix.hash.haskell"},2:{patterns:[{include:"#string_literal"}]}},name:"entity.name.label.haskell"}]},reserved_symbol:{patterns:[{match:`(?x)
  (?<![\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"'']])
  (?:
     (\\.\\.)
    |(:)
    |(=)
    |(\\\\)     # λ not reserved as it is a letter
    |(\\|)
    |(<-|←)
    |(->|→)
    |(-<|↢)
    |(-<<|⤛)
    |(>-|⤚)
    |(>>-|⤜)
    |(∀)
  )
  (?![\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"'']])`,captures:{1:{name:"keyword.operator.double-dot.haskell"},2:{name:"keyword.operator.colon.haskell"},3:{name:"keyword.operator.eq.haskell"},4:{name:"keyword.operator.lambda.haskell"},5:{name:"keyword.operator.pipe.haskell"},6:{name:"keyword.operator.arrow.left.haskell"},7:{name:"keyword.operator.arrow.haskell"},8:{name:"keyword.operator.arrow.left.tail.haskell"},9:{name:"keyword.operator.arrow.left.tail.double.haskell"},10:{name:"keyword.operator.arrow.tail.haskell"},11:{name:"keyword.operator.arrow.tail.double.haskell"},12:{name:"keyword.other.forall.haskell"}}},{match:`(?x)
  (?<=[\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}\\p{S}\\p{P}&&[^\\#,;\\[\`{]]) # Require closing characters
  (\\#+)
  (?![\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}\\p{S}\\p{P}&&[^),;\\]\`}]])   # Disallow opening character`,captures:{1:{name:"keyword.operator.postfix.hash.haskell"}}},{match:`(?x)
  (?<=[\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}\\)\\}\\]]) # Require closing characters
  (@)
  (?=[\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}\\(\\[\\{]) # Require opening character`,captures:{1:{name:"keyword.operator.infix.tight.at.haskell"}}},{match:`(?x)
  (?<![\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}\\p{S}\\p{P}&&[^(,;\\[\`{]])  # Disallow closing characters
  (?:(~)|(!)|(-)|(\\$)|(\\$\\$))
  (?=[\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}\\(\\{\\[]) # Require opening character (non operator symbol)`,captures:{1:{name:"keyword.operator.prefix.tilde.haskell"},2:{name:"keyword.operator.prefix.bang.haskell"},3:{name:"keyword.operator.prefix.minus.haskell"},4:{name:"keyword.operator.prefix.dollar.haskell"},5:{name:"keyword.operator.prefix.double-dollar.haskell"}}}]},type_operator:{patterns:[{match:`(?x)
  # Optional promotion tick
    (?:(?<!')('))?
  # Optional qualified name
    ((?:\\b[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*\\.)*)
  # Type operator proper
    (?![#@]?-})(\\#+|[\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']]+(?<!\\#))
    #((?:[\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']&&[^#@]]|[@#](?!-}))+)`,captures:{1:{name:"keyword.operator.promotion.haskell"},2:{name:"entity.name.namespace.haskell"},3:{name:"storage.type.operator.infix.haskell"}}},{match:`(?x)
  # Optional promotion tick
    (')?
  # Opening backtick
    (\\\`)
  # Optional qualified name
    ((?:[\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*\\.)*)
  # Type constructor proper
    ([\\p{Lu}\\p{Lt}][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)
  # Closing backtick
    (\`)`,captures:{1:{name:"keyword.operator.promotion.haskell"},2:{name:"punctuation.backtick.haskell"},3:{name:"entity.name.namespace.haskell"},4:{name:"storage.type.infix.haskell"},5:{name:"punctuation.backtick.haskell"}}}]},forall:{begin:"\\b(?<!')(forall|∀)\\b(?!')",end:"(\\.)|(->|→)",beginCaptures:{1:{name:"keyword.other.forall.haskell"}},endCaptures:{1:{name:"keyword.operator.period.haskell"},2:{name:"keyword.operator.arrow.haskell"}},patterns:[{include:"#comment_like"},{include:"#type_variable"},{include:"#type_signature"}]},string_literal:{begin:'"',beginCaptures:{0:{name:"punctuation.definition.string.begin.haskell"}},end:'"',endCaptures:{0:{name:"punctuation.definition.string.end.haskell"}},name:"string.quoted.double.haskell",patterns:[{match:`\\\\(NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|[abfnrtv\\\\\\"'\\&])`,name:"constant.character.escape.haskell"},{match:"\\\\o[0-7]+|\\\\x[0-9A-Fa-f]+|\\\\[0-9]+",name:"constant.character.escape.octal.haskell"},{match:"\\\\\\^[A-Z@\\[\\]\\\\\\^_]",name:"constant.character.escape.control.haskell"},{begin:"\\\\\\s",beginCaptures:{0:{name:"constant.character.escape.begin.haskell"}},end:"\\\\",endCaptures:{0:{name:"constant.character.escape.end.haskell"}},patterns:[{match:"\\S+",name:"invalid.illegal.character-not-allowed-here.haskell"}]}]},char_literal:{captures:{1:{name:"punctuation.definition.string.begin.haskell"},2:{name:"constant.character.escape.haskell"},3:{name:"constant.character.escape.octal.haskell"},4:{name:"constant.character.escape.hexadecimal.haskell"},5:{name:"constant.character.escape.control.haskell"},6:{name:"punctuation.definition.string.end.haskell"}},match:`(?x)
  (?<![\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}'])
  (')
  (?:
    [\\ -\\[\\]-~]                         # Basic Char
  | (\\\\(?:NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE
       |DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS
       |US|SP|DEL|[abfnrtv\\\\\\"'\\\\&]))   # Escapes
  | (\\\\o[0-7]+)                         # Octal Escapes
  | (\\\\x[0-9A-Fa-f]+)                   # Hexadecimal Escapes
  | (\\\\\\^[A-Z@\\[\\]\\\\\\^_])                 # Control Chars
  )
  (')
`,name:"string.quoted.single.haskell"},float_literals:{comment:"Floats are decimal or hexadecimal",match:`(?x)
  \\b(?<!')
  (?:  # Decimal
    ([0-9][_0-9]*\\.[0-9][_0-9]*(?:[eE][-+]?[0-9][_0-9]*)?
    |[0-9][_0-9]*[eE][-+]?[0-9][_0-9]*
    )
  |    # Hexadecimal
    (0[xX]_*[0-9a-fA-F][_0-9a-fA-F]*\\.[0-9a-fA-F][_0-9a-fA-F]*(?:[pP][-+]?[0-9][_0-9]*)?
    |0[xX]_*[0-9a-fA-F][_0-9a-fA-F]*[pP][-+]?[0-9][_0-9]*
    )
  )\\b(?!')`,captures:{1:{name:"constant.numeric.floating.decimal.haskell"},2:{name:"constant.numeric.floating.hexadecimal.haskell"}}},integer_literals:{match:`(?x)
  \\b(?<!')
  (?:
    ([0-9][_0-9]*)                    # Decimal integer
  | (0[xX]_*[0-9a-fA-F][_0-9a-fA-F]*) # Hexadecimal integer
  | (0[oO]_*[0-7][_0-7]*)             # Octal integer
  | (0[bB]_*[01][_01]*)               # Binary integer
  )
  \\b(?!')`,captures:{1:{name:"constant.numeric.integral.decimal.haskell"},2:{name:"constant.numeric.integral.hexadecimal.haskell"},3:{name:"constant.numeric.integral.octal.haskell"},4:{name:"constant.numeric.integral.binary.haskell"}}},numeric_literals:{patterns:[{include:"#float_literals"},{include:"#integer_literals"}]},ffi:{begin:"^(\\s*)(foreign)\\s+(import|export)\\s+",beginCaptures:{2:{name:"keyword.other.foreign.haskell"},3:{name:"keyword.other.$3.haskell"}},name:"meta.$3.foreign.haskell",end:`(?x) # Detect end of FFI block by decreasing indentation:
  (?=\\}|;)       # Explicit indentation
  |^(?!          # Implicit indentation: end match on newline *unless* the new line is either:
      \\1\\s+\\S    # - more indented, or
    | \\s*        # - starts with whitespace, followed by:
      (?: $      #   - the end of the line (i.e. empty line), or
      |\\{-[^@]   #   - the start of a block comment, or
      |--+       #   - the start of a single-line comment.
         (?![\\p{S}\\p{P}&&[^(),;\\[\\]{}\`_"']]).*$) # non-symbol
                 # The double dash may not be followed by other operator characters
                 # (then it would be an operator, not a comment)
    )
`,patterns:[{include:"#comment_like"},{match:"\\b(?<!')(ccall|cplusplus|dotnet|jvm|stdcall|prim|capi)\\s+",captures:{1:{name:"keyword.other.calling-convention.$1.haskell"}}},{begin:`(?=")|(?=\\b(?<!')([\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)\\b(?!'))`,end:"(?=(::|∷)(?![\\p{S}\\p{P}&&[^(),;\\[\\]`{}_\"']]))",patterns:[{include:"#comment_like"},{match:`(?x)
  \\b(?<!')(safe|unsafe|interruptible)\\b(?!')
  \\s*
  ("(?:\\\\"|[^"])*")?
  \\s*
  (?:
    (?:\\b(?<!'')([\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)\\b(?!'))
   |(?:\\(\\s*(?!--+\\))([\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']]+)\\s*\\))
  )
`,captures:{1:{name:"keyword.other.safety.$1.haskell"},2:{name:"entity.name.foreign.haskell",patterns:[{include:"#string_literal"}]},3:{name:"entity.name.function.haskell"},4:{name:"entity.name.function.infix.haskell"}}},{match:`(?x)
  \\b(?<!')(safe|unsafe|interruptible)\\b(?!')
  \\s*
  ("(?:\\\\"|[^"])*")?
  \\s*$
`,captures:{1:{name:"keyword.other.safety.$1.haskell"},2:{name:"entity.name.foreign.haskell",patterns:[{include:"#string_literal"}]}}},{match:`(?x)
  "(?:\\\\"|[^"])*"`,captures:{0:{name:"entity.name.foreign.haskell",patterns:[{include:"#string_literal"}]}}},{match:`(?x)
   (?:\\b(?<!'')([\\p{Ll}_][\\p{Ll}_\\p{Lu}\\p{Lt}\\p{Nd}']*)\\b(?!'))
  |(?:(\\()\\s*(?!--+\\))([\\p{S}\\p{P}&&[^(),;\\[\\]\`{}_"']]+)\\s*(\\)))
`,captures:{1:{name:"entity.name.function.haskell"},2:{name:"punctuation.paren.haskell"},3:{name:"entity.name.function.infix.haskell"},4:{name:"punctuation.paren.haskell"}}}]},{include:"#double_colon"},{include:"#type_signature"}]},inline_phase:{begin:"\\[",beginCaptures:{0:{name:"punctuation.bracket.haskell"}},end:"\\]",endCaptures:{0:{name:"punctuation.bracket.haskell"}},name:"meta.inlining-phase.haskell",patterns:[{match:"~",name:"punctuation.tilde.haskell"},{include:"#integer_literals"},{match:"\\w*",name:"invalid"}]},quasi_quote:{patterns:[{begin:`(?x)
  (\\[)
  (e|d|p)?
  (\\|\\|?)`,beginCaptures:{1:{name:"keyword.operator.quasi-quotation.begin.haskell"},2:{name:"entity.name.quasi-quoter.haskell"},3:{name:"keyword.operator.quasi-quotation.begin.haskell"}},end:"\\3\\]",endCaptures:{0:{name:"keyword.operator.quasi-quotation.end.haskell"}},name:"meta.quasi-quotation.haskell",patterns:[{include:"$self"}]},{begin:`(?x)
  (\\[)
  (t)
  (\\|\\|?)`,beginCaptures:{1:{name:"keyword.operator.quasi-quotation.begin.haskell"},2:{name:"entity.name.quasi-quoter.haskell"},3:{name:"keyword.operator.quasi-quotation.begin.haskell"}},end:"\\3\\]",endCaptures:{0:{name:"keyword.operator.quasi-quotation.end.haskell"}},name:"meta.quasi-quotation.haskell",patterns:[{include:"#type_signature"}]},{begin:`(?x)
  (\\[)
  (?:(\\$\\$)|(\\$))?
  ((?:[^\\s\\p{S}\\p{P}]|[\\.'_])*)
  (\\|\\|?)`,beginCaptures:{1:{name:"keyword.operator.quasi-quotation.begin.haskell"},2:{name:"keyword.operator.prefix.double-dollar.haskell"},3:{name:"keyword.operator.prefix.dollar.haskell"},4:{patterns:[{include:"#qualifier"}],name:"entity.name.quasi-quoter.haskell"},5:{name:"keyword.operator.quasi-quotation.begin.haskell"}},end:"\\5\\]",endCaptures:{0:{name:"keyword.operator.quasi-quotation.end.haskell"}},name:"meta.quasi-quotation.haskell"}]}},scopeName:"source.haskell",uuid:"5C034675-1F6D-497E-8073-369D37E2FD7D",displayName:"Haskell",aliases:["hs"]});var n=[e];export{n as default};
