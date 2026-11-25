# Graph Report - arcade  (2026-11-25)

## Corpus Check
- 36 files · ~45,760 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 1, .ico 1, .css 1)

## Summary
- 3755 nodes · 8074 edges · 222 communities (98 shown, 124 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 236 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7f48e5e9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- pdf.worker.min.mjs
- TetrisEngine
- resume/page.tsx
- compilerOptions
- portfolio.ts
- react
- ConfigNamespace
- ProjectsSection.tsx
- AgenticTetris.tsx
- XFAObjectArray
- StringObject
- TemplateNamespace
- XFAObject
- Option01
- shadow
- PDFEditor
- getStringOption
- CFFCompiler
- Dict
- Annotation
- ._create
- XhtmlObject
- getMeasurement
- FormatError
- .createDocumentHandler
- .checkAndRepair
- IntegerObject
- AESBaseCipher
- LocaleSetNamespace
- Page
- ConnectionSetNamespace
- PDFImage
- PDFDocument
- XRef
- RefSet
- compileCharString
- Type1Parser
- calculateSHA512
- ButtonWidgetAnnotation
- JpegStream
- StringStream
- stringToPDFString
- PsWasmCompiler
- Glyph
- FileSpec
- CMap
- .getOperatorList
- PartialEvaluator
- ExclGroup
- Font
- PsNode
- AgenticTetris.tsx
- CFFParser
- warn
- Parser
- Util
- unreachable
- .[lf]
- BaseStream
- Cache
- icons.tsx
- Binder
- MessageHandler
- decodeScan
- TextMeasure
- StructTreePage
- ChunkedStream
- Lexer
- .getTextContent
- WidgetAnnotation
- PSStackToTree
- measureToString
- setupDoc
- BasePdfManager
- .translateFont
- Builder
- isCmd
- XFAFactory
- XMLParserBase
- .constructPostScript
- .extractDataStructures
- XmlObject
- .ensureBuffer
- ChunkedStreamManager
- WasmImage
- react
- Fill
- ColorSpaceUtils
- incrementalUpdate
- SingleIntersector
- Hero.tsx
- .success
- PageArea
- Stream
- CalRGBCS
- valueToHtml
- JpegImage
- NullOptimizer
- OperatorList
- BrotliStream
- CFFFont
- IccColorSpace
- ColorSpace
- ContentObject
- SimpleDOMNode
- PsJsCompiler
- HorizontalExperienceTimeline.tsx
- BasePDFStreamReader
- SimpleXMLParser
- Datasets
- Value
- XFAAttribute
- CipherTransform
- DecodeStream
- XRefWrapper
- Jbig2Stream
- lexer_Lexer
- XFAParser
- BasePDFStream
- BasePDFStreamRangeReader
- Br
- updateXFA
- t
- JpxStream
- Ga
- setFontFamily
- LabCS
- MeshStreamReader
- Text
- .setBorderStyle
- assert
- BinaryCMapStream
- .isUsable
- FontFinder
- MetadataParser
- TextState
- createValidAbsoluteUrl
- CCITTFaxStream
- lookupMatrix
- NetworkPdfManager
- HTMLResult
- PageSet
- xdp_Xdp
- AlternateCS
- DeviceCmykCS
- DeviceRgbCS
- ErrorFont
- ExData
- Integer
- .#tt
- signature_Signature
- Stylesheet
- Template
- Traverse
- Ui
- Assist
- BehaviorOverride
- CalGrayCS
- Exclude
- Range
- Relevant
- Rename
- ValidateApprovalSignatures
- Window
- DateElement
- Decimal
- DecryptStream
- ImageEdit
- Linear
- LocalPdfManager
- LZWStream
- Occur
- Radial
- Root
- Stipple
- StreamsSequenceStream
- SubjectDN
- template_Pattern
- Variables
- TimeSlotManager
- Acrobat7
- AlwaysEmbed
- Button
- Calculate
- config_Encryption
- config_Message
- Log
- MediumInfo
- NeverEmbed
- OpenAction
- Output
- OutputXSL
- Pcl
- Permissions
- Ps
- SilentPrint
- Staple
- Transform
- WebClient
- Xsl
- DateTimeEdit
- DayNames
- Desc
- DigestMethod
- Encryption
- EncryptionMethod
- EraNames
- Event
- Extras
- Hyphenation
- Keep
- Manifest
- Message
- NullCipher
- NumericEdit
- PatternCS
- PDFWorkerStreamReader
- Reasons
- Signing
- template_Font
- TimeStamp

## God Nodes (most connected - your core abstractions)
1. `XFAObject` - 217 edges
2. `warn()` - 173 edges
3. `ConfigNamespace` - 141 edges
4. `TemplateNamespace` - 115 edges
5. `shadow()` - 107 edges
6. `FormatError` - 90 edges
7. `getStringOption()` - 85 edges
8. `XFAObjectArray` - 66 edges
9. `PDFEditor` - 60 edges
10. `Catalog` - 54 edges

## Surprising Connections (you probably didn't know these)
- `Home()` --calls--> `NavBar()`  [EXTRACTED]
  src/app/page.tsx → src/components/layout/NavBar.tsx
- `Home()` --calls--> `SiteFooter()`  [EXTRACTED]
  src/app/page.tsx → src/components/layout/SiteFooter.tsx
- `Home()` --calls--> `ContactSection()`  [EXTRACTED]
  src/app/page.tsx → src/components/sections/ContactSection.tsx
- `Home()` --calls--> `Hero()`  [EXTRACTED]
  src/app/page.tsx → src/components/sections/Hero.tsx
- `Home()` --calls--> `HorizontalExperienceTimeline()`  [EXTRACTED]
  src/app/page.tsx → src/components/sections/HorizontalExperienceTimeline.tsx

## Import Cycles
- None detected.

## Communities (222 total, 124 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.10
Nodes (26): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, tailwindcss@^4, @tailwindcss/turbopack@^4, @types/node@^20, @types/react@^19 (+18 more)

### Community 1 - "pdf.worker.min.mjs"
Cohesion: 0.01
Nodes (187): Aa, addChildren(), addHex(), af, al, an, applyStandardFontGlyphMap(), ar (+179 more)

### Community 2 - "TetrisEngine"
Cohesion: 0.21
Nodes (4): absoluteCells(), cellsCollide(), createBoard(), TetrisEngine

### Community 3 - "resume/page.tsx"
Cohesion: 0.16
Nodes (17): DisabledAction(), metadata, PendingViewer(), ResumePage(), NavBar(), NavLink(), ArrowDown(), Moon() (+9 more)

### Community 4 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 5 - "portfolio.ts"
Cohesion: 0.10
Nodes (23): buildItems(), CommandPalette(), getClientSnapshot(), getServerSnapshot(), GROUP_ORDER, PaletteDialog(), PaletteItem, subscribe() (+15 more)

### Community 6 - "react"
Cohesion: 0.16
Nodes (11): nextConfig, next@16.4.6, next, instrumentSerif, jakartaSans, jetbrainsMono, metadata, RootLayout() (+3 more)

### Community 7 - "ConfigNamespace"
Cohesion: 0.02
Nodes (39): ADBE_JSConsole, ADBE_JSDebugger, Attributes, AutoSave, config_Template, config_Validate, ConfigNamespace, Conformance (+31 more)

### Community 8 - "ProjectsSection.tsx"
Cohesion: 0.25
Nodes (15): Home(), BeyondTechSection(), DetailModal(), CertificationsSection(), COURSEWORK, EducationSection(), CompactProject(), LEAD_IDS (+7 more)

### Community 9 - "AgenticTetris.tsx"
Cohesion: 0.08
Nodes (32): AgentPlan, AgentReport, BoardFeatures, cloneBoard(), HeuristicBreakdown, landingRow(), measureBoard(), planPlacement() (+24 more)

### Community 10 - "XFAObjectArray"
Cohesion: 0.02
Nodes (29): Acrobat, Agent, CalendarSymbols, Config, config_FontInfo, ConnectionSet, CurrencySymbols, Data (+21 more)

### Community 11 - "StringObject"
Cohesion: 0.02
Nodes (27): Amd, Base, Certificate, config_Picture, Creator, Enforce, ExcludeNS, GroupParent (+19 more)

### Community 12 - "TemplateNamespace"
Cohesion: 0.03
Nodes (24): AppearanceFilter, Barcode, BindItems, Bookend, Connect, DefaultUi, DigestMethods, Encrypt (+16 more)

### Community 13 - "XFAObject"
Cohesion: 0.03
Nodes (9): BatchOutput, Color, Common, Compress, Equate, LabelPrinter, TemplateCache, VersionControl (+1 more)

### Community 14 - "Option01"
Cohesion: 0.03
Nodes (21): AddSilentPrint, AddViewerPreferences, BooleanElement, Change, CompressLogicalStructure, config_Encrypt, ContentCopy, DocumentAssembly (+13 more)

### Community 15 - "shadow"
Cohesion: 0.06
Nodes (8): Catalog, EquateRange, FeatureTest, fetchDest(), fonts_Glyph, InfoUtils, NameTree, shadow()

### Community 16 - "PDFEditor"
Cohesion: 0.08
Nodes (3): PageData, PDFEditor, stringToAsciiOrUTF16BE()

### Community 17 - "getStringOption"
Cohesion: 0.05
Nodes (19): Arc, Break, BreakAfter, BreakBefore, Comb, config_Area, Filter, getFloat() (+11 more)

### Community 18 - "CFFCompiler"
Cohesion: 0.05
Nodes (11): CFF, CFFCharset, CFFCompiler, CFFDict, CFFHeader, CFFIndex, CFFOffsetTracker, CFFPrivateDict (+3 more)

### Community 19 - "Dict"
Cohesion: 0.05
Nodes (7): codePointIter(), Dict, FakeUnicodeFont, FreeTextAnnotation, Name, stringToUTF16HexString(), StructTreeRoot

### Community 20 - "Annotation"
Cohesion: 0.07
Nodes (7): Annotation, getRgbColor(), getTransformMatrix(), isNumberArray(), lookupNormalRect(), lookupRect(), PopupAnnotation

### Community 21 - "._create"
Cohesion: 0.08
Nodes (17): CaretAnnotation, CircleAnnotation, FileAttachmentAnnotation, getPdfColorArray(), getQuadPoints(), HighlightAnnotation, LineAnnotation, LinkAnnotation (+9 more)

### Community 22 - "XhtmlObject"
Cohesion: 0.05
Nodes (15): a, B, Body, Html, I, ol, Ol, P (+7 more)

### Community 23 - "getMeasurement"
Cohesion: 0.05
Nodes (12): Area, Caption, ContentArea, Draw, Field, getMeasurement(), getRelevant(), ic (+4 more)

### Community 24 - "FormatError"
Cohesion: 0.09
Nodes (14): BaseShading, buildMeshVertexData(), DummyShading, FlateStream, FormatError, FunctionBasedShading, getB(), getColorConversionBatchSize() (+6 more)

### Community 25 - ".createDocumentHandler"
Cohesion: 0.07
Nodes (8): clearGlobalCaches(), DocumentData, GlobalColorSpaceCache, GlobalImageCache, makeSet(), Ref, RefMap, WorkerMessageHandler

### Community 26 - ".checkAndRepair"
Cohesion: 0.08
Nodes (22): adjustMapping(), cn, createCmapTable(), createNameTable(), createOS2Table(), createPostscriptName(), createPostTable(), DataBuilder (+14 more)

### Community 27 - "IntegerObject"
Cohesion: 0.05
Nodes (13): AdjustData, AdobeExtensionLevel, CompressObjectStream, Copies, CurrentPage, IntegerObject, Level, MsgId (+5 more)

### Community 28 - "AESBaseCipher"
Cohesion: 0.08
Nodes (9): AES256Cipher, AESBaseCipher, ARCFourCipher, calculateMD5(), CipherTransformFactory, isArrayEqual(), PasswordException, PDF20 (+1 more)

### Community 29 - "LocaleSetNamespace"
Cohesion: 0.05
Nodes (13): CurrencySymbol, DatePattern, DateTimeSymbols, Day, Era, locale_set_Locale, LocaleSetNamespace, Meridiem (+5 more)

### Community 30 - "Page"
Cohesion: 0.10
Nodes (3): AnnotationFactory, NullStream, Page

### Community 31 - "ConnectionSetNamespace"
Cohesion: 0.06
Nodes (12): connection_set_Uri, ConnectionSetNamespace, EffectiveInputPolicy, EffectiveOutputPolicy, Operation, RootElement, SoapAction, SoapAddress (+4 more)

### Community 32 - "PDFImage"
Cohesion: 0.11
Nodes (6): convertBlackAndWhiteToRGBA(), convertToRGBA(), ImageResizer, PDFImage, sumOpaqueRow(), sumTransparentRow()

### Community 33 - "PDFDocument"
Cohesion: 0.08
Nodes (3): find(), PDFDocument, stringToBytes()

### Community 34 - "XRef"
Cohesion: 0.10
Nodes (6): InvalidPDFException, ParserEOFException, sa, XRef, XRefEntryException, XRefParseException

### Community 35 - "RefSet"
Cohesion: 0.12
Nodes (4): _collectAction(), _collectJS(), ObjectLoader, RefSet

### Community 36 - "compileCharString"
Cohesion: 0.07
Nodes (9): Commands, compileCharString(), CompiledFont, compileGlyf(), getFloat214(), getSubroutineBias(), lookupCmap(), TrueTypeCompiled (+1 more)

### Community 37 - "Type1Parser"
Cohesion: 0.12
Nodes (8): decrypt(), findBlock(), isHexDigit(), isSpecial(), isWhiteSpace(), Type1CharString, Type1Font, Type1Parser

### Community 38 - "calculateSHA512"
Cohesion: 0.07
Nodes (19): AES128Cipher, calculate_sha256_ch(), calculate_sha256_littleSigma(), calculate_sha256_littleSigmaPrime(), calculate_sha256_maj(), calculate_sha256_sigma(), calculate_sha256_sigmaPrime(), calculateSHA256() (+11 more)

### Community 39 - "ButtonWidgetAnnotation"
Cohesion: 0.11
Nodes (6): ButtonWidgetAnnotation, ChoiceWidgetAnnotation, collectActions(), deepCompare(), getInheritableProperty(), isRefsEqual()

### Community 40 - "JpegStream"
Cohesion: 0.07
Nodes (5): AppearanceStreamEvaluator, CmykICCBasedCS, JpegStream, LocalFunctionCache, PDFFunctionFactory

### Community 41 - "StringStream"
Cohesion: 0.14
Nodes (10): DefaultAppearanceEvaluator, escapeString(), getPdfColor(), InkAnnotation, numberToString(), parseDefaultAppearance(), StringStream, stringToUTF16String() (+2 more)

### Community 42 - "stringToPDFString"
Cohesion: 0.09
Nodes (11): parseNestedOrder(), parseOrder(), appendIfJavaScriptDict(), fetchRemoteDest(), getNewAnnotationsMap(), isDict(), isName(), makeArr() (+3 more)

### Community 43 - "PsWasmCompiler"
Cohesion: 0.25
Nodes (5): encodeASCIIString(), PsWasmCompiler, section(), unsignedLEB128(), vec()

### Community 44 - "Glyph"
Cohesion: 0.07
Nodes (6): CompositeGlyph, Contour, GlyfTable, Glyph, GlyphHeader, SimpleGlyph

### Community 45 - "FileSpec"
Cohesion: 0.13
Nodes (6): FileSpec, getSoundFormat(), MediaAnnotation, RichMediaAnnotation, ScreenAnnotation, SoundAnnotation

### Community 46 - "CMap"
Cohesion: 0.11
Nodes (3): amendFallbackToUnicode(), CharCodeMap, CMap

### Community 47 - ".getOperatorList"
Cohesion: 0.09
Nodes (10): addCachedImageOps(), argIsDict(), BaseLocalCache, EvalState, LocalColorSpaceCache, LocalGStateCache, LocalImageCache, LocalTilingPatternCache (+2 more)

### Community 48 - "PartialEvaluator"
Cohesion: 0.12
Nodes (5): isPDFFunction(), MurmurHash3_64, normalizeBlendMode(), PartialEvaluator, buildPath()

### Community 49 - "ExclGroup"
Cohesion: 0.09
Nodes (7): addHTML(), createLine(), ExclGroup, flushHTML(), getAvailableSpace(), getContainedChildren(), Subform

### Community 50 - "Font"
Cohesion: 0.10
Nodes (8): convertCidString(), Font, FontRendererFactory, n, parseCff(), ToUnicodeMap, un, yn

### Community 51 - "PsNode"
Cohesion: 0.12
Nodes (10): ast_Parser, PsBlock, PsIf, PsIfElse, PsNode, PsNumber, PsOperator, PsProgram (+2 more)

### Community 52 - "AgenticTetris.tsx"
Cohesion: 0.13
Nodes (23): AgenticTetris(), CabinetButton(), Callout, Chamber(), Controls, drawBlock(), drawGhost(), drawGrid() (+15 more)

### Community 53 - "CFFParser"
Cohesion: 0.15
Nodes (4): CFFEncoding, CFFFDSelect, CFFParser, removeCharStringBytes()

### Community 54 - "warn"
Cohesion: 0.12
Nodes (11): adjustWidths(), bytesToString(), addPageError(), parseOperand(), getFontFileType(), info(), isDefaultDecodeHelper(), isTrueTypeCollectionFile() (+3 more)

### Community 56 - "Util"
Cohesion: 0.12
Nodes (4): looksLikeUnsigned16BitNegative(), recoverSigned16BitBBox(), TranslatedFont, Util

### Community 57 - "unreachable"
Cohesion: 0.11
Nodes (3): IdentityCMap, Pattern, unreachable()

### Community 58 - ".[lf]"
Cohesion: 0.21
Nodes (16): applyAssist(), CheckButton, checkDimensions(), ChoiceList, createWrapper(), fixDimensions(), getBorderDims(), handleBreak() (+8 more)

### Community 60 - "Cache"
Cohesion: 0.07
Nodes (7): Cache, Compression, config_Script, Debug, Driver, Pdf, ViewerPreferences

### Community 61 - "icons.tsx"
Cohesion: 0.20
Nodes (16): FOOTER_NAV, SiteFooter(), ContactDialog(), ContactSection(), announce(), CopyButton(), copyText(), ArrowUpRight() (+8 more)

### Community 62 - "Binder"
Cohesion: 0.20
Nodes (4): Binder, createText(), makeMap(), searchNode()

### Community 63 - "MessageHandler"
Cohesion: 0.15
Nodes (5): AbortException, MessageHandler, ResponseException, UnknownErrorException, wrapReason()

### Community 64 - "decodeScan"
Cohesion: 0.18
Nodes (14): buildComponentData(), decodeScan(), decodeHuffman(), readBit(), receive(), receiveAndExtend(), DNLMarkerError, EOIMarkerError (+6 more)

### Community 65 - "TextMeasure"
Cohesion: 0.14
Nodes (6): FontInfo, FontSelector, layoutNode(), layoutText(), selectFont(), TextMeasure

### Community 66 - "StructTreePage"
Cohesion: 0.13
Nodes (4): NameOrNumberTree, NumberTree, StructTreePage, nodeToSerializable()

### Community 68 - "Lexer"
Cohesion: 0.19
Nodes (4): Cmd, Lexer, Linearization, toHexDigit()

### Community 69 - ".getTextContent"
Cohesion: 0.24
Nodes (16): addFakeSpaces(), appendEOL(), applyInverseRotation(), buildTextContentItem(), closePendingMarkedContentItems(), compareWithLastPosition(), ensureTextContentItem(), flushTextContentItem() (+8 more)

### Community 70 - "WidgetAnnotation"
Cohesion: 0.21
Nodes (3): getModificationDate(), SignatureWidgetAnnotation, WidgetAnnotation

### Community 71 - "PSStackToTree"
Cohesion: 0.28
Nodes (3): PsBinaryNode, PsConstNode, PSStackToTree

### Community 72 - "measureToString"
Cohesion: 0.18
Nodes (8): computeBbox(), Corner, Edge, fixTextIndent(), hasMargin(), mapStyle(), measureToString(), setMinMaxDimensions()

### Community 73 - "setupDoc"
Cohesion: 0.18
Nodes (11): arrayBuffersToBytes(), ensureNotTerminated(), finishWorkerTask(), getPassword(), loadDocument(), setupDoc(), onFailure(), onSuccess() (+3 more)

### Community 75 - ".translateFont"
Cohesion: 0.21
Nodes (9): Bn, getStandardFontName(), getXfaFontDict(), getXfaFontName(), ir, isKnownFontName(), normalizeCSSFontFamily(), normalizeFontName() (+1 more)

### Community 76 - "Builder"
Cohesion: 0.17
Nodes (3): Builder, Empty, UnknownNamespace

### Community 77 - "isCmd"
Cohesion: 0.24
Nodes (14): createBuiltInCMap(), expectInt(), expectString(), extendCMap(), isCmd(), parseBfChar(), parseBfRange(), parseCidChar() (+6 more)

### Community 80 - ".constructPostScript"
Cohesion: 0.29
Nodes (6): buildPostScriptWasmFunction(), interpolate(), parsePostScriptFunction(), PDFFunction, setArity(), toNumberArray()

### Community 81 - ".extractDataStructures"
Cohesion: 0.17
Nodes (3): CMapFactory, getEncoding(), IdentityToUnicodeMap

### Community 83 - ".ensureBuffer"
Cohesion: 0.15
Nodes (4): Ascii85Stream, AsciiHexStream, PredictorStream, RunLengthStream

### Community 85 - "WasmImage"
Cohesion: 0.19
Nodes (3): JpxError, JpxImage, WasmImage

### Community 86 - "react"
Cohesion: 0.19
Nodes (11): dependencies, framer-motion@^14.9.0, pdfjs-dist@^6.5.438, react@19.3.0, react-dom@19.3.0, pdfjs-dist, react, react-dom (+3 more)

### Community 87 - "Fill"
Cohesion: 0.12
Nodes (4): Bind, Certificates, Fill, SignData

### Community 88 - "ColorSpaceUtils"
Cohesion: 0.15
Nodes (3): ColorSpaceUtils, DeviceGrayCS, DeviceRgbaCS

### Community 89 - "incrementalUpdate"
Cohesion: 0.21
Nodes (10): computeIDs(), escapePDFName(), getIndexes(), getSizeInBytes(), incrementalUpdate(), writeDict(), writeInt(), writeObject() (+2 more)

### Community 91 - "Hero.tsx"
Cohesion: 0.23
Nodes (11): framer-motion, CARD_H, HangingIdCard(), MetallicClasp(), Hero(), renderEmphasis(), riseContainer, riseVariants (+3 more)

### Community 92 - ".success"
Cohesion: 0.39
Nodes (3): ariaLabel(), isRequired(), toStyle()

### Community 96 - "valueToHtml"
Cohesion: 0.17
Nodes (3): DateTime, Float, valueToHtml()

### Community 101 - "CFFFont"
Cohesion: 0.20
Nodes (4): buildMapping(), CFFFont, recoverGlyphName(), type1FontGlyphMapping()

### Community 102 - "IccColorSpace"
Cohesion: 0.22
Nodes (3): IccColorSpace, passArray8ToWasm0(), qcms_convert_array()

### Community 104 - "ContentObject"
Cohesion: 0.18
Nodes (3): ContentObject, DefaultTypeface, Record

### Community 107 - "HorizontalExperienceTimeline.tsx"
Cohesion: 0.27
Nodes (9): EASE, ExperienceCard(), HorizontalExperienceTimeline(), REST, TimelineNode(), WIND, StatusPill(), EXPERIENCE (+1 more)

### Community 110 - "Datasets"
Cohesion: 0.20
Nodes (3): Datasets, datasets_Data, DatasetsNamespace

### Community 122 - "updateXFA"
Cohesion: 0.29
Nodes (5): DatasetReader, decodeString(), parseXFAPath(), stringToUTF8String(), updateXFA()

### Community 123 - "t"
Cohesion: 0.32
Nodes (8): decodeBlock(), decodeMcu(), getBlockBufferOffset(), t, vo, Za(), receiveInstance(), updateMemoryViews()

### Community 125 - "Ga"
Cohesion: 0.29
Nodes (5): Ga(), receiveInstance(), updateMemoryViews(), JBig2CCITTFaxImage, Jbig2Error

### Community 126 - "setFontFamily"
Cohesion: 0.25
Nodes (5): getCurrentPara(), serializeFontFamily(), setFontFamily(), setPara(), stripQuotes()

### Community 131 - "assert"
Cohesion: 0.33
Nodes (6): assert(), compileFontInfo(), writeBuffer(), encodeStrings(), toRomanNumerals(), writeStrings()

### Community 133 - ".isUsable"
Cohesion: 0.29
Nodes (4): fetchSync(), getUint8ArrayMemory0(), __wbg_finalize_init(), __wbg_get_imports()

### Community 137 - "createValidAbsoluteUrl"
Cohesion: 0.33
Nodes (4): A, createValidAbsoluteUrl(), fixURL(), recoverJsURL()

### Community 139 - "lookupMatrix"
Cohesion: 0.47
Nodes (3): CheckedOperatorList, getTilingPatternIR(), lookupMatrix()

## Knowledge Gaps
- **124 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `warn()` connect `warn` to `pdf.worker.min.mjs`, `.setBorderStyle`, `Text`, `.isUsable`, `FontFinder`, `XFAObjectArray`, `lookupMatrix`, `XFAObject`, `shadow`, `CFFCompiler`, `Dict`, `Annotation`, `._create`, `FormatError`, `.createDocumentHandler`, `.checkAndRepair`, `Template`, `Page`, `PDFImage`, `PDFDocument`, `XRef`, `RefSet`, `compileCharString`, `Rename`, `Type1Parser`, `ButtonWidgetAnnotation`, `JpegStream`, `StringStream`, `stringToPDFString`, `FileSpec`, `.getOperatorList`, `PartialEvaluator`, `Font`, `PsNode`, `CFFParser`, `Parser`, `Util`, `.[lf]`, `Binder`, `decodeScan`, `StructTreePage`, `Lexer`, `.getTextContent`, `measureToString`, `.translateFont`, `Builder`, `isCmd`, `XFAFactory`, `.constructPostScript`, `.extractDataStructures`, `WasmImage`, `incrementalUpdate`, `.success`, `OperatorList`, `CFFFont`, `XFAParser`, `updateXFA`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Why does `ConfigNamespace` connect `ConfigNamespace` to `pdf.worker.min.mjs`, `XFAObjectArray`, `StringObject`, `XFAObject`, `Option01`, `shadow`, `getStringOption`, `IntegerObject`, `BehaviorOverride`, `Exclude`, `Range`, `Relevant`, `Rename`, `ValidateApprovalSignatures`, `Window`, `Acrobat7`, `AlwaysEmbed`, `config_Encryption`, `config_Message`, `Log`, `MediumInfo`, `NeverEmbed`, `Cache`, `OpenAction`, `Output`, `OutputXSL`, `Pcl`, `Permissions`, `Ps`, `SilentPrint`, `Staple`, `Transform`, `WebClient`, `Xsl`, `ContentObject`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Should `pdf.worker.min.mjs` be split into smaller, more focused modules?**
  _Cohesion score 0.011878597592883308 - nodes in this community are weakly interconnected._
- **Why does `Dict` connect `Dict` to `pdf.worker.min.mjs`, `WidgetAnnotation`, `ButtonWidgetAnnotation`, `StringStream`, `stringToPDFString`, `.translateFont`, `PDFEditor`, `Annotation`, `._create`, `Parser`, `incrementalUpdate`, `updateXFA`, `Page`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `portfolio.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09852216748768473 - nodes in this community are weakly interconnected._