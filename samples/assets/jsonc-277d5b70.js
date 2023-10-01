const n=Object.freeze({information_for_contributors:["This file has been converted from https://github.com/microsoft/vscode-JSON.tmLanguage/blob/master/JSON.tmLanguage","If you want to provide a fix or improvement, please create a pull request against the original repository.","Once accepted there, we are happy to receive an update request."],version:"https://github.com/microsoft/vscode-JSON.tmLanguage/commit/9bd83f1c252b375e957203f21793316203f61f70",name:"jsonc",scopeName:"source.json.comments",patterns:[{include:"#value"}],repository:{array:{begin:"\\[",beginCaptures:{0:{name:"punctuation.definition.array.begin.json.comments"}},end:"\\]",endCaptures:{0:{name:"punctuation.definition.array.end.json.comments"}},name:"meta.structure.array.json.comments",patterns:[{include:"#value"},{match:",",name:"punctuation.separator.array.json.comments"},{match:"[^\\s\\]]",name:"invalid.illegal.expected-array-separator.json.comments"}]},comments:{patterns:[{begin:"/\\*\\*(?!/)",captures:{0:{name:"punctuation.definition.comment.json.comments"}},end:"\\*/",name:"comment.block.documentation.json.comments"},{begin:"/\\*",captures:{0:{name:"punctuation.definition.comment.json.comments"}},end:"\\*/",name:"comment.block.json.comments"},{captures:{1:{name:"punctuation.definition.comment.json.comments"}},match:"(//).*$\\n?",name:"comment.line.double-slash.js"}]},constant:{match:"\\b(?:true|false|null)\\b",name:"constant.language.json.comments"},number:{match:`(?x)        # turn on extended mode
  -?        # an optional minus
  (?:
    0       # a zero
    |       # ...or...
    [1-9]   # a 1-9 character
    \\d*     # followed by zero or more digits
  )
  (?:
    (?:
      \\.    # a period
      \\d+   # followed by one or more digits
    )?
    (?:
      [eE]  # an e character
      [+-]? # followed by an option +/-
      \\d+   # followed by one or more digits
    )?      # make exponent optional
  )?        # make decimal portion optional`,name:"constant.numeric.json.comments"},object:{begin:"\\{",beginCaptures:{0:{name:"punctuation.definition.dictionary.begin.json.comments"}},end:"\\}",endCaptures:{0:{name:"punctuation.definition.dictionary.end.json.comments"}},name:"meta.structure.dictionary.json.comments",patterns:[{comment:"the JSON object key",include:"#objectkey"},{include:"#comments"},{begin:":",beginCaptures:{0:{name:"punctuation.separator.dictionary.key-value.json.comments"}},end:"(,)|(?=\\})",endCaptures:{1:{name:"punctuation.separator.dictionary.pair.json.comments"}},name:"meta.structure.dictionary.value.json.comments",patterns:[{comment:"the JSON object value",include:"#value"},{match:"[^\\s,]",name:"invalid.illegal.expected-dictionary-separator.json.comments"}]},{match:"[^\\s\\}]",name:"invalid.illegal.expected-dictionary-separator.json.comments"}]},string:{begin:'"',beginCaptures:{0:{name:"punctuation.definition.string.begin.json.comments"}},end:'"',endCaptures:{0:{name:"punctuation.definition.string.end.json.comments"}},name:"string.quoted.double.json.comments",patterns:[{include:"#stringcontent"}]},objectkey:{begin:'"',beginCaptures:{0:{name:"punctuation.support.type.property-name.begin.json.comments"}},end:'"',endCaptures:{0:{name:"punctuation.support.type.property-name.end.json.comments"}},name:"string.json.comments support.type.property-name.json.comments",patterns:[{include:"#stringcontent"}]},stringcontent:{patterns:[{match:`(?x)                # turn on extended mode
  \\\\                # a literal backslash
  (?:               # ...followed by...
    ["\\\\/bfnrt]     # one of these characters
    |               # ...or...
    u               # a u
    [0-9a-fA-F]{4}) # and four hex digits`,name:"constant.character.escape.json.comments"},{match:"\\\\.",name:"invalid.illegal.unrecognized-string-escape.json.comments"}]},value:{patterns:[{include:"#constant"},{include:"#number"},{include:"#string"},{include:"#array"},{include:"#object"},{include:"#comments"}]}},displayName:"JSON with Comments"});var e=[n];export{e as default};
