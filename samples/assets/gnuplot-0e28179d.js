const n=Object.freeze({name:"gnuplot",scopeName:"source.gnuplot",uuid:"A75AB1C2-611C-4500-9EE4-20668B5BB465",fileTypes:["gp","plt","plot","gnuplot"],patterns:[{name:"invalid.illegal.backslash.gnuplot",match:"(\\\\(?!\\n).*)"},{name:"punctuation.separator.statement.gnuplot",match:"(;)"},{include:"#LineComment"},{include:"#DataBlock"},{include:"#MacroExpansion"},{include:"#VariableDecl"},{include:"#ArrayDecl"},{include:"#FunctionDecl"},{include:"#ShellCommand"},{include:"#Command"}],repository:{DataBlock:{name:"meta.datablock.gnuplot",begin:`(?x:
				([$][A-Za-z_]\\w*)\\s*             # 1: var name
				(<<)\\s*                    # 2: shift operator
				([A-Za-z_]\\w*)\\s*                # 3: end tag
				(?=(\\#|$))                       # 4: comment or end of line
			)`,beginCaptures:{1:{patterns:[{include:"#SpecialVariable"}]},3:{name:"constant.language.datablock.gnuplot"}},end:"^(\\3)\\b(.*)",endCaptures:{1:{name:"constant.language.datablock.gnuplot"},2:{name:"invalid.illegal.datablock.gnuplot"}},patterns:[{include:"#LineComment"},{include:"#NumberLiteral"},{include:"#DoubleQuotedStringLiteral"}]},MacroExpansion:{begin:"([@][A-Za-z_]\\w*)",beginCaptures:{1:{patterns:[{include:"#SpecialVariable"}]}},end:"(?=(;|#|\\\\(?!\\n)|(?<!\\\\)\\n$))",patterns:[{include:"#Expression"}]},VariableDecl:{name:"meta.variable.gnuplot",begin:`\\b(?x:
				([A-Za-z_]\\w*)\\s*                # 1: var name
				(?:
					(\\[)\\s*                      # 2: opening bracket
					(.*)\\s*                      # 3: expression
					(\\])\\s*                      # 4: closing bracket
				)?
				(?=(=)(?!\\s*=))                  # 5: assignment
			)`,beginCaptures:{1:{name:"entity.name.variable.gnuplot",patterns:[{include:"#InvalidVariableDecl"},{include:"#BuiltinVariable"}]},3:{patterns:[{include:"#Expression"}]}},end:"(?=(;|#|\\\\(?!\\n)|(?<!\\\\)\\n$))",patterns:[{include:"#Expression"}]},ArrayDecl:{name:"meta.variable.gnuplot",begin:`\\b(?x:
				(array)\\s+                       # 1: array keyword
				([A-Za-z_]\\w*)?                  # 2: var name
				# Note: Handle size decl and init expression inside.
				# TODO: Properly annotate brackets.
			)`,beginCaptures:{1:{name:"support.type.array.gnuplot"},2:{name:"entity.name.variable.gnuplot",patterns:[{include:"#InvalidVariableDecl"},{include:"#BuiltinVariable"}]}},end:"(?=(;|#|\\\\(?!\\n)|(?<!\\\\)\\n$))",patterns:[{include:"#Expression"}]},FunctionDecl:{name:"meta.function.gnuplot",begin:`\\b(?x:
				([A-Za-z_]\\w*)\\s*                # 1: func name
				(                                # 2: parameter list
					(\\()\\s*                      # 3: opening parens
					([A-Za-z_]\\w*)\\s*            # 4: arg name
					(?:
						(,)\\s*                   # 5: comma
						([A-Za-z_]\\w*)\\s*        # 6: other args
					)*
					(\\))                         # 7: closing parens
				)
			)`,beginCaptures:{1:{name:"entity.name.function.gnuplot",patterns:[{include:"#BuiltinFunction"}]},2:{name:"meta.function.parameters.gnuplot"},3:{name:"punctuation.definition.parameters.begin.gnuplot"},4:{name:"variable.parameter.function.language.gnuplot"},5:{name:"punctuation.separator.parameters.gnuplot"},6:{name:"variable.parameter.function.language.gnuplot"},7:{name:"punctuation.definition.parameters.end.gnuplot"}},end:"(?=(;|#|\\\\(?!\\n)|(?<!\\\\)\\n$))",patterns:[{include:"#Expression"}]},InvalidVariableDecl:{name:"invalid.illegal.variable.gnuplot",match:"\\b(GPVAL_\\w*|MOUSE_\\w*)\\b"},ShellCommand:{begin:"(!)",beginCaptures:{1:{name:"keyword.other.shell.gnuplot"}},end:"(?=(#|\\\\(?!\\n)|(?<!\\\\)\\n$))",patterns:[{name:"string.unquoted",match:"([^#]|\\\\(?=\\n))"}]},Command:{patterns:[{name:"invalid.deprecated.command.gnuplot",begin:`\\b(?x:
						update
					)\\b`,end:"(?=(;|#|\\\\(?!\\n)|(?<!\\\\)\\n$))"},{begin:`\\b(?x:
						break        |
						clear        |
						continue     |
						pwd          |
						refresh      |
						replot       |
						reread       |
						shell
					)\\b`,beginCaptures:{0:{name:"keyword.other.command.gnuplot"}},end:"(?=(;|#|\\\\(?!\\n)|(?<!\\\\)\\n$))",patterns:[{include:"#InvalidWord"}]},{begin:`\\b(?x:
						cd           |
						call         |
						eval         |
						exit         |
						help         |
						history      |
						load         |
						lower        |
						pause        |
						print        |
						printerr     |
						quit         |
						raise        |
						save         |
						stats        |
						system       |
						test         |
						toggle
					)\\b`,beginCaptures:{0:{name:"keyword.other.command.gnuplot"}},end:"(?=(;|#|\\\\(?!\\n)|(?<!\\\\)\\n$))",patterns:[{include:"#Expression"}]},{begin:"\\b(import)\\s(.+)\\s(from)",beginCaptures:{1:{name:"keyword.control.import.gnuplot"},2:{patterns:[{include:"#FunctionDecl"}]},3:{name:"keyword.control.import.gnuplot"}},end:"(?=(;|#|\\\\(?!\\n)|(?<!\\\\)\\n$))",patterns:[{include:"#SingleQuotedStringLiteral"},{include:"#DoubleQuotedStringLiteral"},{include:"#InvalidWord"}]},{begin:"\\b(reset)\\b",beginCaptures:{1:{name:"keyword.other.command.gnuplot"}},end:"(?=(;|#|\\\\(?!\\n)|(?<!\\\\)\\n$))",patterns:[{name:"support.class.reset.gnuplot",match:"\\b(bind|error(state)?|session)\\b"},{include:"#InvalidWord"}]},{begin:"\\b(undefine)\\b",beginCaptures:{1:{name:"keyword.other.command.gnuplot"}},end:"(?=(;|#|\\\\(?!\\n)|(?<!\\\\)\\n$))",patterns:[{include:"#BuiltinVariable"},{include:"#BuiltinFunction"},{name:"source.gnuplot",match:"(?<=\\s)([$]?[A-Za-z_]\\w*\\*?)(?=\\s)"},{include:"#InvalidWord"}]},{begin:"\\b(if|while)\\b",beginCaptures:{1:{name:"keyword.control.conditional.gnuplot"}},end:"(?=(\\{|#|\\\\(?!\\n)|(?<!\\\\)\\n$))",patterns:[{include:"#Expression"}]},{begin:"\\b(else)\\b",beginCaptures:{1:{name:"keyword.control.conditional.gnuplot"}},end:"(?=(\\{|#|\\\\(?!\\n)|(?<!\\\\)\\n$))"},{begin:"\\b(do)\\b",beginCaptures:{1:{name:"keyword.control.flow.gnuplot"}},end:"(?=(\\{|#|\\\\(?!\\n)|(?<!\\\\)\\n$))",patterns:[{include:"#ForIterationExpr"}]},{begin:"\\b(set)(?=\\s+pm3d)\\b",beginCaptures:{1:{name:"keyword.other.command.gnuplot"}},end:"(?=(;|#|\\\\(?!\\n)|(?<!\\\\)\\n$))",patterns:[{name:"invalid.deprecated.options.gnuplot",match:"\\b(hidden3d|map|transparent|solid)\\b"},{include:"#SetUnsetOptions"},{include:"#ForIterationExpr"},{include:"#Expression"}]},{begin:"\\b((un)?set)\\b",beginCaptures:{1:{name:"keyword.other.command.gnuplot"}},end:"(?=(;|#|\\\\(?!\\n)|(?<!\\\\)\\n$))",patterns:[{include:"#SetUnsetOptions"},{include:"#ForIterationExpr"},{include:"#Expression"}]},{begin:"\\b(show)\\b",beginCaptures:{1:{name:"keyword.other.command.gnuplot"}},end:"(?=(;|#|\\\\(?!\\n)|(?<!\\\\)\\n$))",patterns:[{include:"#ExtraShowOptions"},{include:"#SetUnsetOptions"},{include:"#Expression"}]},{begin:"\\b(fit|(s)?plot)\\b",beginCaptures:{1:{name:"keyword.other.command.gnuplot"}},end:"(?=(;|#|\\\\(?!\\n)|(?<!\\\\)\\n$))",patterns:[{include:"#ColumnIndexLiteral"},{include:"#PlotModifiers"},{include:"#ForIterationExpr"},{include:"#Expression"}]}]},SetUnsetOptions:{patterns:[{name:"invalid.deprecated.options.gnuplot",match:`\\G\\s*\\b(?x:
						clabel              |
						data                |
						function            |
						historysize         |
						macros              |
						ticslevel           |
						ticscale            |
						(style\\s+increment\\s+\\w+)
					)\\b`},{name:"support.class.options.gnuplot",match:`\\G\\s*\\b(?x:
						angles              |
						arrow               |
						autoscale           |
						border              |
						boxwidth            |
						clip                |
						cntr(label|param)   |
						color(box|sequence)?|
						contour             |
						(dash|line)type     |
						datafile            |
						decimal(sign)?      |
						dgrid3d             |
						dummy               |
						encoding            |
						(error)?bars        |
						fit                 |
						fontpath            |
						format              |
						grid                |
						hidden3d            |
						history             |
						(iso)?samples       |
						jitter              |
						key                 |
						label               |
						link                |
						loadpath            |
						locale              |
						logscale            |
						mapping             |
						[lrtb]margin        |
						margins             |
						micro               |
						minus(sign)?        |
						mono(chrome)?       |
						mouse               |
						multiplot           |
						nonlinear           |
						object              |
						offsets             |
						origin              |
						output              |
						parametric          |
						(p|r)axis           |
						pm3d                |
						palette             |
						pointintervalbox    |
						pointsize           |
						polar               |
						print               |
						psdir               |
						size                |
						style               |
						surface             |
						table               |
						terminal            |
						termoption          |
						theta               |
						tics                |
						timestamp           |
						timefmt             |
						title               |
						view                |
						xyplane             |
						zero                |
						(no)?(m)?(x|x2|y|y2|z|cb|r|t)tics  |
						(x|x2|y|y2|z|cb)data               |
						(x|x2|y|y2|z|cb|r)label            |
						(x|x2|y|y2|z|cb)dtics              |
						(x|x2|y|y2|z|cb)mtics              |
						(x|x2|y|y2|z|cb|[rtuv])range       |
						(x|x2|y|y2|z)?zeroaxis
					)\\b`}]},ExtraShowOptions:{name:"support.class.options.gnuplot",match:`\\b(?x:
				all                         |
				bind                        |
				colornames                  |
				functions                   |
				plot                        |
				variables                   |
				version
			)\\b`},PlotModifiers:{patterns:[{name:"invalid.deprecated.plot.gnuplot",match:"\\b(thru)\\b"},{name:"storage.type.plot.gnuplot",match:`\\b(?x:
						in(dex)?            |
						every               |
						us(ing)?            |
						wi(th)?             |
						via
					)\\b`},{name:"storage.type.plot.gnuplot",match:"\\b(newhist(ogram)?)\\b"}]},InvalidWord:{name:"invalid.illegal.gnuplot",match:"([^;#\\\\[:space:]]+)"},Expression:{patterns:[{include:"#Literal"},{include:"#SpecialVariable"},{include:"#BuiltinVariable"},{include:"#BuiltinOperator"},{include:"#TernaryExpr"},{include:"#FunctionCallExpr"},{include:"#SummationExpr"}]},ForIterationExpr:{begin:`\\b(?x:
				(for)\\s*                    # 1: for keyword
				(\\[)\\s*                     # 2: opening bracket
				(?:                         #    optionally
					([A-Za-z_]\\w*)\\s+       # 3: var name
					(in)\\b                  # 4: in keyword
				)?
			)`,beginCaptures:{1:{name:"keyword.control.flow.gnuplot"},2:{patterns:[{include:"#RangeSeparators"}]},3:{name:"variable.other.iterator.gnuplot"},4:{name:"keyword.control.flow.gnuplot"}},end:"((\\])|(?=(#|\\\\(?!\\n)|(?<!\\\\)\\n$)))",endCaptures:{2:{patterns:[{include:"#RangeSeparators"}]}},patterns:[{include:"#Expression"},{include:"#RangeSeparators"}]},SummationExpr:{begin:"\\b(sum)\\s*(\\[)",beginCaptures:{1:{name:"keyword.other.sum.gnuplot"},2:{patterns:[{include:"#RangeSeparators"}]}},end:"((\\])|(?=(#|\\\\(?!\\n)|(?<!\\\\)\\n$)))",endCaptures:{2:{patterns:[{include:"#RangeSeparators"}]}},patterns:[{include:"#Expression"},{include:"#RangeSeparators"}]},FunctionCallExpr:{name:"meta.function-call.gnuplot",begin:"\\b([A-Za-z_]\\w*)\\s*(\\()",beginCaptures:{1:{name:"variable.function.gnuplot",patterns:[{include:"#BuiltinFunction"}]},2:{name:"punctuation.definition.arguments.begin.gnuplot"}},end:"((\\))|(?=(#|\\\\(?!\\n)|(?<!\\\\)\\n$)))",endCaptures:{2:{name:"punctuation.definition.arguments.end.gnuplot"}},patterns:[{include:"#Expression"}]},TernaryExpr:{begin:"(?<!\\?)(\\?)(?!\\?)",beginCaptures:{1:{name:"keyword.operator.ternary.gnuplot"}},end:"((?<!:)(:)(?!:)|(?=(#|\\\\(?!\\n)|(?<!\\\\)\\n$)))",endCaptures:{2:{name:"keyword.operator.ternary.gnuplot"}},patterns:[{include:"#Expression"}]},RangeSeparators:{patterns:[{name:"punctuation.section.brackets.begin.gnuplot",match:"(\\[)"},{name:"punctuation.separator.range.gnuplot",match:"(:)"},{name:"punctuation.section.brackets.end.gnuplot",match:"(\\])"}]},BuiltinOperator:{patterns:[{name:"keyword.operator.logical.gnuplot",match:"(&&|\\|\\|)"},{name:"keyword.operator.bitwise.gnuplot",match:"(<<|>>|&|\\||\\^)"},{name:"keyword.operator.comparison.gnuplot",match:"(==|!=|<=|<|>=|>)"},{name:"keyword.operator.assignment.gnuplot",match:"(=)"},{name:"keyword.operator.arithmetic.gnuplot",match:"(\\+|-|~|!)"},{name:"keyword.operator.arithmetic.gnuplot",match:"(\\*\\*|\\+|-|\\*|/|%)"},{name:"keyword.operator.strings.gnuplot",match:"(\\.|\\b(eq|ne)\\b)",captures:{2:{name:"keyword.operator.word.gnuplot"}}}]},BuiltinVariable:{patterns:[{name:"invalid.deprecated.variable.gnuplot",match:`\\b(?x:
						FIT_LIMIT           |
						FIT_MAXITER         |
						FIT_START_LAMBDA    |
						FIT_LAMBDA_FACTOR   |
						FIT_SKIP            |
						FIT_INDEX
					)\\b`},{name:"support.constant.gnuplot",match:"\\b(GPVAL_\\w*|MOUSE_\\w*)\\b"},{name:"support.variable.gnuplot",match:"\\b(ARG[0-9C]|GPFUN_\\w*|FIT_\\w*|STATS_\\w*|pi|NaN)\\b"}]},SpecialVariable:{patterns:[{match:"(?<=[\\[:=])\\s*(\\*)\\s*(?=[:\\]])",captures:{1:{name:"constant.language.wildcard.gnuplot"}}},{name:"constant.language.special.gnuplot",match:"(([@$])[A-Za-z_]\\w*)\\b",captures:{2:{name:"punctuation.definition.variable.gnuplot"}}}]},BuiltinFunction:{patterns:[{name:"invalid.deprecated.function.gnuplot",match:`\\b(?x:
						defined
					)\\b`},{name:"support.function.math.gnuplot",match:`\\b(?x:
						abs            |
						acos           |
						acosh          |
						airy           |
						arg            |
						asin           |
						asinh          |
						atan           |
						atan2          |
						atanh          |
						EllipticK      |
						EllipticE      |
						EllipticPi     |
						besj0          |
						besj1          |
						besy0          |
						besy1          |
						ceil           |
						cos            |
						cosh           |
						erf            |
						erfc           |
						exp            |
						expint         |
						floor          |
						gamma          |
						ibeta          |
						inverf         |
						igamma         |
						imag           |
						invnorm        |
						int            |
						lambertw       |
						lgamma         |
						log            |
						log10          |
						norm           |
						rand           |
						real           |
						sgn            |
						sin            |
						sinh           |
						sqrt           |
						tan            |
						tanh           |
						voigt          |
						cerf           |
						cdawson        |
						faddeeva       |
						erfi           |
						VP
					)\\b`},{name:"support.function.string.gnuplot",match:`\\b(?x:
						gprintf        |
						sprintf        |
						strlen         |
						strstrt        |
						substr         |
						strftime       |
						strptime       |
						system         |
						word           |
						words
					)\\b`},{name:"support.function.other.gnuplot",match:`\\b(?x:
						column         |
						columnhead     |
						exists         |
						hsv2rgb        |
						stringcolumn   |
						timecolumn     |
						tm_hour        |
						tm_mday        |
						tm_min         |
						tm_mon         |
						tm_sec         |
						tm_wday        |
						tm_yday        |
						tm_year        |
						time           |
						valid          |
						value
					)\\b`}]},Literal:{patterns:[{include:"#NumberLiteral"},{include:"#DeprecatedScriptArgsLiteral"},{include:"#SingleQuotedStringLiteral"},{include:"#DoubleQuotedStringLiteral"},{include:"#InterpolatedStringLiteral"}]},NumberLiteral:{patterns:[{name:"constant.numeric.float.gnuplot",match:`(?x:
						# .5e2 and 0.5e2
						( ((\\b[0-9]+)|(?<!\\d)) )           # number or not a preceding digit
						( [.][0-9]+ )                         # non-optional fractional
						( [Ee][+-]?[0-9]+ )?                  # optional exponent
					)(cm|in)?\\b`},{name:"constant.numeric.float.gnuplot",match:`(?x:
						# 5e2 and 5.e2
						( \\b[0-9]+ )                          # non-optional number
						(
							(     ( [Ee][+-]?[0-9]+\\b )  ) |  # non-optional exponent
							( [.] ( [Ee][+-]?[0-9]+\\b )? )    # point and optional exponent
						)
					)(cm\\b|in\\b)?`},{name:"constant.numeric.hex.gnuplot",match:"\\b(0[Xx][0-9a-fA-F]+)(cm|in)?\\b"},{name:"constant.numeric.dec.gnuplot",match:"\\b(0+)(cm|in)?\\b"},{name:"constant.numeric.oct.gnuplot",match:"\\b(0[0-7]+)(cm|in)?\\b"},{name:"invalid.illegal.oct.gnuplot",match:"\\b(0[0-9]+)(cm|in)?\\b"},{name:"constant.numeric.dec.gnuplot",match:"\\b([0-9]+)(cm|in)?\\b"}]},ColumnIndexLiteral:{name:"support.constant.columnindex.gnuplot",match:"([$][0-9]+)\\b"},DeprecatedScriptArgsLiteral:{name:"invalid.illegal.scriptargs.gnuplot",match:"([$][0-9#])"},SingleQuotedStringLiteral:{name:"string.quoted.single.gnuplot",begin:"(')",beginCaptures:{1:{name:"punctuation.definition.string.begin.gnuplot"}},end:"((')(?!')|(?=(?<!\\\\)\\n$))",endCaptures:{0:{name:"punctuation.definition.string.end.gnuplot"}},patterns:[{include:"#RGBColorSpec"},{name:"constant.character.escape.gnuplot",match:"('')"}]},DoubleQuotedStringLiteral:{name:"string.quoted.double.gnuplot",begin:'(")',beginCaptures:{1:{name:"punctuation.definition.string.begin.gnuplot"}},end:'((")|(?=(?<!\\\\)\\n$))',endCaptures:{0:{name:"punctuation.definition.string.end.gnuplot"}},patterns:[{include:"#EscapedChar"},{include:"#RGBColorSpec"},{include:"#DeprecatedScriptArgsLiteral"},{include:"#InterpolatedStringLiteral"}]},InterpolatedStringLiteral:{name:"string.interpolated.gnuplot",begin:"(`)",beginCaptures:{1:{name:"punctuation.definition.string.begin.gnuplot"}},end:"((`)|(?=(?<!\\\\)\\n$))",endCaptures:{0:{name:"punctuation.definition.string.end.gnuplot"}},patterns:[{include:"#EscapedChar"}]},RGBColorSpec:{name:"constant.other.placeholder.gnuplot",match:"\\G(0x|#)(([0-9a-fA-F]{6})|([0-9a-fA-F]{8}))\\b"},EscapedChar:{name:"constant.character.escape.gnuplot",match:"(\\\\.)"},LineComment:{name:"comment.line.number-sign.gnuplot",begin:"(#)",beginCaptures:{1:{name:"punctuation.definition.comment.begin.gnuplot"}},end:"(?=(?<!\\\\)\\n$)",endCaptures:{0:{name:"punctuation.definition.comment.end.gnuplot"}}}},displayName:"Gnuplot"});var e=[n];export{e as default};
