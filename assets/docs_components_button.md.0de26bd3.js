import{_ as l,o as p,c as e,k as s,a,t as o,Q as t}from"./chunks/framework.a2f82312.js";const b=JSON.parse('{"title":"Button","description":"A JSX email component which styles an anchor element to appear as a button","frontmatter":{"title":"Button","description":"A JSX email component which styles an anchor element to appear as a button","slug":"button","type":"component","head":[["meta",{"name":"og:description","content":"A JSX email component which styles an anchor element to appear as a button"}],["meta",{"name":"og:image","content":"https://jsx.email/og.png"}],["meta",{"name":"og:site_name","content":"JSX email"}],["meta",{"name":"og:title","content":"Button"}],["meta",{"name":"og:type","content":"website"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:description","content":"A JSX email component which styles an anchor element to appear as a button"}],["meta",{"name":"twitter:image","content":"https://jsx.email/og.png"}],["meta",{"name":"twitter:title","content":"Button"}]]},"headers":[],"relativePath":"../../../docs/components/button.md","filePath":"../../../docs/components/button.md"}'),c={name:"../../../docs/components/button.md"},r={id:"frontmatter-title",tabindex:"-1"},i=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1),y=s("div",{class:"tip custom-block"},[s("p",{class:"custom-block-title"},"TIP"),s("p",null,[a("Semantics: Quite often in the email world we talk about buttons when we actually mean links. Behind the scenes this component is a "),s("code",null,"<a>"),a(" element which is styled like a "),s("code",null,"<button>"),a(" element.")])],-1),d=s("h2",{id:"install",tabindex:"-1"},[a("Install "),s("a",{class:"header-anchor",href:"#install","aria-label":'Permalink to "Install"'},"​")],-1),E=t(`<div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-kD5ar" id="tab-2oPBHLB" checked="checked"><label for="tab-2oPBHLB">pnpm</label><input type="radio" name="group-kD5ar" id="tab-2feVzUY"><label for="tab-2feVzUY">bun</label><input type="radio" name="group-kD5ar" id="tab-L7tcChr"><label for="tab-L7tcChr">npm</label><input type="radio" name="group-kD5ar" id="tab-yWEwbd_"><label for="tab-yWEwbd_">yarn</label></div><div class="blocks"><div class="language-console vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki slack-dark vp-code-dark"><code><span class="line"><span style="color:#E6E6E6;">pnpm add jsx-email</span></span></code></pre><pre class="shiki slack-ochin vp-code-light"><code><span class="line"><span style="color:#002339;">pnpm add jsx-email</span></span></code></pre></div><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki slack-dark vp-code-dark"><code><span class="line"><span style="color:#E6E6E6;">bun add jsx-email</span></span></code></pre><pre class="shiki slack-ochin vp-code-light"><code><span class="line"><span style="color:#002339;">bun add jsx-email</span></span></code></pre></div><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki slack-dark vp-code-dark"><code><span class="line"><span style="color:#E6E6E6;">npm add jsx-email</span></span></code></pre><pre class="shiki slack-ochin vp-code-light"><code><span class="line"><span style="color:#002339;">npm add jsx-email</span></span></code></pre></div><div class="language-console vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">console</span><pre class="shiki slack-dark vp-code-dark"><code><span class="line"><span style="color:#E6E6E6;">yarn add jsx-email</span></span></code></pre><pre class="shiki slack-ochin vp-code-light"><code><span class="line"><span style="color:#002339;">yarn add jsx-email</span></span></code></pre></div></div></div><h2 id="usage" tabindex="-1">Usage <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;Usage&quot;">​</a></h2><p>Add the component to your email template. Include styles where needed.</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki slack-dark vp-code-dark"><code><span class="line"><span style="color:#C586C0;">import</span><span style="color:#E6E6E6;"> { </span><span style="color:#9CDCFE;">Button</span><span style="color:#E6E6E6;"> } </span><span style="color:#C586C0;">from</span><span style="color:#E6E6E6;"> </span><span style="color:#CE9178;">&#39;jsx-email&#39;</span><span style="color:#E6E6E6;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#569CD6;">const</span><span style="color:#E6E6E6;"> </span><span style="color:#DCDCAA;">Email</span><span style="color:#E6E6E6;"> </span><span style="color:#D4D4D4;">=</span><span style="color:#E6E6E6;"> () </span><span style="color:#569CD6;">=&gt;</span><span style="color:#E6E6E6;"> {</span></span>
<span class="line"><span style="color:#E6E6E6;">  </span><span style="color:#C586C0;">return</span><span style="color:#E6E6E6;"> (</span></span>
<span class="line"><span style="color:#E6E6E6;">    </span><span style="color:#808080;">&lt;</span><span style="color:#4EC9B0;">Button</span><span style="color:#E6E6E6;"> </span><span style="color:#9CDCFE;">width</span><span style="color:#D4D4D4;">=</span><span style="color:#569CD6;">{</span><span style="color:#B5CEA8;">160</span><span style="color:#569CD6;">}</span><span style="color:#E6E6E6;"> </span><span style="color:#9CDCFE;">height</span><span style="color:#D4D4D4;">=</span><span style="color:#569CD6;">{</span><span style="color:#B5CEA8;">60</span><span style="color:#569CD6;">}</span><span style="color:#E6E6E6;"> </span><span style="color:#9CDCFE;">href</span><span style="color:#D4D4D4;">=</span><span style="color:#CE9178;">&quot;https://jsx.email&quot;</span><span style="color:#E6E6E6;"> </span><span style="color:#9CDCFE;">target</span><span style="color:#D4D4D4;">=</span><span style="color:#CE9178;">&quot;_blank&quot;</span><span style="color:#808080;">&gt;</span></span>
<span class="line"><span style="color:#E6E6E6;">      JOIN US</span></span>
<span class="line"><span style="color:#E6E6E6;">    </span><span style="color:#808080;">&lt;/</span><span style="color:#4EC9B0;">Button</span><span style="color:#808080;">&gt;</span></span>
<span class="line"><span style="color:#E6E6E6;">  );</span></span>
<span class="line"><span style="color:#E6E6E6;">};</span></span></code></pre><pre class="shiki slack-ochin vp-code-light"><code><span class="line"><span style="color:#7B30D0;">import</span><span style="color:#002339;"> { </span><span style="color:#2F86D2;">Button</span><span style="color:#002339;"> } </span><span style="color:#7B30D0;">from</span><span style="color:#002339;"> </span><span style="color:#A44185;">&#39;jsx-email&#39;</span><span style="color:#002339;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#0991B6;">const</span><span style="color:#002339;"> </span><span style="color:#7EB233;">Email</span><span style="color:#002339;"> </span><span style="color:#7B30D0;">=</span><span style="color:#002339;"> () </span><span style="color:#0991B6;">=&gt;</span><span style="color:#002339;"> {</span></span>
<span class="line"><span style="color:#002339;">  </span><span style="color:#7B30D0;">return</span><span style="color:#002339;"> (</span></span>
<span class="line"><span style="color:#002339;">    &lt;</span><span style="color:#DC3EB7;">Button</span><span style="color:#002339;"> </span><span style="color:#DF8618;font-style:italic;">width</span><span style="color:#7B30D0;">=</span><span style="color:#002339;">{</span><span style="color:#174781;">160</span><span style="color:#002339;">} </span><span style="color:#DF8618;font-style:italic;">height</span><span style="color:#7B30D0;">=</span><span style="color:#002339;">{</span><span style="color:#174781;">60</span><span style="color:#002339;">} </span><span style="color:#DF8618;font-style:italic;">href</span><span style="color:#7B30D0;">=</span><span style="color:#A44185;">&quot;https://jsx.email&quot;</span><span style="color:#002339;"> </span><span style="color:#DF8618;font-style:italic;">target</span><span style="color:#7B30D0;">=</span><span style="color:#A44185;">&quot;_blank&quot;</span><span style="color:#002339;">&gt;</span></span>
<span class="line"><span style="color:#002339;">      JOIN US</span></span>
<span class="line"><span style="color:#002339;">    &lt;/</span><span style="color:#DC3EB7;">Button</span><span style="color:#002339;">&gt;</span></span>
<span class="line"><span style="color:#002339;">  );</span></span>
<span class="line"><span style="color:#002339;">};</span></span></code></pre></div><h2 id="component-props" tabindex="-1">Component Props <a class="header-anchor" href="#component-props" aria-label="Permalink to &quot;Component Props&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki slack-dark vp-code-dark"><code><span class="line"><span style="color:#C586C0;">export</span><span style="color:#E6E6E6;"> </span><span style="color:#569CD6;">interface</span><span style="color:#E6E6E6;"> </span><span style="color:#4EC9B0;">ButtonProps</span><span style="color:#E6E6E6;"> </span><span style="color:#569CD6;">extends</span><span style="color:#E6E6E6;"> </span><span style="color:#4EC9B0;">BaseProps</span><span style="color:#E6E6E6;">&lt;</span><span style="color:#CE9178;">&#39;a&#39;</span><span style="color:#E6E6E6;">&gt; {</span></span>
<span class="line"><span style="color:#E6E6E6;">  </span><span style="color:#9CDCFE;">width</span><span style="color:#D4D4D4;">:</span><span style="color:#E6E6E6;"> </span><span style="color:#4EC9B0;">number</span><span style="color:#E6E6E6;">;</span></span>
<span class="line"><span style="color:#E6E6E6;">  </span><span style="color:#9CDCFE;">height</span><span style="color:#D4D4D4;">:</span><span style="color:#E6E6E6;"> </span><span style="color:#4EC9B0;">number</span><span style="color:#E6E6E6;">;</span></span>
<span class="line"><span style="color:#E6E6E6;">  </span><span style="color:#9CDCFE;">href</span><span style="color:#D4D4D4;">?:</span><span style="color:#E6E6E6;"> </span><span style="color:#4EC9B0;">string</span><span style="color:#E6E6E6;">;</span></span>
<span class="line"><span style="color:#E6E6E6;">  </span><span style="color:#9CDCFE;">align</span><span style="color:#D4D4D4;">?:</span><span style="color:#E6E6E6;"> </span><span style="color:#CE9178;">&#39;left&#39;</span><span style="color:#E6E6E6;"> </span><span style="color:#D4D4D4;">|</span><span style="color:#E6E6E6;"> </span><span style="color:#CE9178;">&#39;center&#39;</span><span style="color:#E6E6E6;"> </span><span style="color:#D4D4D4;">|</span><span style="color:#E6E6E6;"> </span><span style="color:#CE9178;">&#39;right&#39;</span><span style="color:#E6E6E6;">;</span></span>
<span class="line"><span style="color:#E6E6E6;">  </span><span style="color:#9CDCFE;">backgroundColor</span><span style="color:#D4D4D4;">?:</span><span style="color:#E6E6E6;"> </span><span style="color:#4EC9B0;">string</span><span style="color:#E6E6E6;">;</span></span>
<span class="line"><span style="color:#E6E6E6;">  </span><span style="color:#9CDCFE;">borderColor</span><span style="color:#D4D4D4;">?:</span><span style="color:#E6E6E6;"> </span><span style="color:#4EC9B0;">string</span><span style="color:#E6E6E6;">;</span></span>
<span class="line"><span style="color:#E6E6E6;">  </span><span style="color:#9CDCFE;">borderRadius</span><span style="color:#D4D4D4;">?:</span><span style="color:#E6E6E6;"> </span><span style="color:#4EC9B0;">number</span><span style="color:#E6E6E6;">;</span></span>
<span class="line"><span style="color:#E6E6E6;">  </span><span style="color:#9CDCFE;">borderSize</span><span style="color:#D4D4D4;">?:</span><span style="color:#E6E6E6;"> </span><span style="color:#4EC9B0;">number</span><span style="color:#E6E6E6;">;</span></span>
<span class="line"><span style="color:#E6E6E6;">  </span><span style="color:#9CDCFE;">fontSize</span><span style="color:#D4D4D4;">?:</span><span style="color:#E6E6E6;"> </span><span style="color:#4EC9B0;">number</span><span style="color:#E6E6E6;">;</span></span>
<span class="line"><span style="color:#E6E6E6;">  </span><span style="color:#9CDCFE;">textColor</span><span style="color:#D4D4D4;">?:</span><span style="color:#E6E6E6;"> </span><span style="color:#4EC9B0;">string</span><span style="color:#E6E6E6;">;</span></span>
<span class="line"><span style="color:#E6E6E6;">  </span><span style="color:#9CDCFE;">withBackground</span><span style="color:#D4D4D4;">?:</span><span style="color:#E6E6E6;"> </span><span style="color:#4EC9B0;">boolean</span><span style="color:#E6E6E6;">;</span></span>
<span class="line"><span style="color:#E6E6E6;">}</span></span></code></pre><pre class="shiki slack-ochin vp-code-light"><code><span class="line"><span style="color:#7B30D0;">export</span><span style="color:#002339;"> </span><span style="color:#0991B6;">interface</span><span style="color:#002339;"> </span><span style="color:#0444AC;">ButtonProps</span><span style="color:#002339;"> </span><span style="color:#DA5221;">extends</span><span style="color:#002339;"> </span><span style="color:#B02767;">BaseProps</span><span style="color:#002339;">&lt;</span><span style="color:#A44185;">&#39;a&#39;</span><span style="color:#002339;">&gt; {</span></span>
<span class="line"><span style="color:#002339;">  </span><span style="color:#2F86D2;">width</span><span style="color:#7B30D0;">:</span><span style="color:#002339;"> </span><span style="color:#DC3EB7;">number</span><span style="color:#002339;">;</span></span>
<span class="line"><span style="color:#002339;">  </span><span style="color:#2F86D2;">height</span><span style="color:#7B30D0;">:</span><span style="color:#002339;"> </span><span style="color:#DC3EB7;">number</span><span style="color:#002339;">;</span></span>
<span class="line"><span style="color:#002339;">  </span><span style="color:#2F86D2;">href</span><span style="color:#7B30D0;">?:</span><span style="color:#002339;"> </span><span style="color:#DC3EB7;">string</span><span style="color:#002339;">;</span></span>
<span class="line"><span style="color:#002339;">  </span><span style="color:#2F86D2;">align</span><span style="color:#7B30D0;">?:</span><span style="color:#002339;"> </span><span style="color:#A44185;">&#39;left&#39;</span><span style="color:#002339;"> </span><span style="color:#7B30D0;">|</span><span style="color:#002339;"> </span><span style="color:#A44185;">&#39;center&#39;</span><span style="color:#002339;"> </span><span style="color:#7B30D0;">|</span><span style="color:#002339;"> </span><span style="color:#A44185;">&#39;right&#39;</span><span style="color:#002339;">;</span></span>
<span class="line"><span style="color:#002339;">  </span><span style="color:#2F86D2;">backgroundColor</span><span style="color:#7B30D0;">?:</span><span style="color:#002339;"> </span><span style="color:#DC3EB7;">string</span><span style="color:#002339;">;</span></span>
<span class="line"><span style="color:#002339;">  </span><span style="color:#2F86D2;">borderColor</span><span style="color:#7B30D0;">?:</span><span style="color:#002339;"> </span><span style="color:#DC3EB7;">string</span><span style="color:#002339;">;</span></span>
<span class="line"><span style="color:#002339;">  </span><span style="color:#2F86D2;">borderRadius</span><span style="color:#7B30D0;">?:</span><span style="color:#002339;"> </span><span style="color:#DC3EB7;">number</span><span style="color:#002339;">;</span></span>
<span class="line"><span style="color:#002339;">  </span><span style="color:#2F86D2;">borderSize</span><span style="color:#7B30D0;">?:</span><span style="color:#002339;"> </span><span style="color:#DC3EB7;">number</span><span style="color:#002339;">;</span></span>
<span class="line"><span style="color:#002339;">  </span><span style="color:#2F86D2;">fontSize</span><span style="color:#7B30D0;">?:</span><span style="color:#002339;"> </span><span style="color:#DC3EB7;">number</span><span style="color:#002339;">;</span></span>
<span class="line"><span style="color:#002339;">  </span><span style="color:#2F86D2;">textColor</span><span style="color:#7B30D0;">?:</span><span style="color:#002339;"> </span><span style="color:#DC3EB7;">string</span><span style="color:#002339;">;</span></span>
<span class="line"><span style="color:#002339;">  </span><span style="color:#2F86D2;">withBackground</span><span style="color:#7B30D0;">?:</span><span style="color:#002339;"> </span><span style="color:#DC3EB7;">boolean</span><span style="color:#002339;">;</span></span>
<span class="line"><span style="color:#002339;">}</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>It&#39;s <strong>highly reccommended</strong> for <strong>optimal email client compatibility</strong> to use the component props below to set styles, rather than CSS, the <code>style</code> property, or <a href="/docs/components/tailwind"><code>Tailwind</code></a> classes. This is especially important for Outlook.</p></div><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki slack-dark vp-code-dark"><code><span class="line"><span style="color:#9CDCFE;">href</span><span style="color:#D4D4D4;">?:</span><span style="color:#E6E6E6;"> </span><span style="color:#9CDCFE;">string</span><span style="color:#E6E6E6;">;</span></span></code></pre><pre class="shiki slack-ochin vp-code-light"><code><span class="line"><span style="color:#2F86D2;">href</span><span style="color:#7B30D0;">?:</span><span style="color:#002339;"> </span><span style="color:#2F86D2;">string</span><span style="color:#002339;">;</span></span></code></pre></div><p>The url to navigate to when the button is clicked.</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki slack-dark vp-code-dark"><code><span class="line"><span style="color:#E6E6E6;">width: </span><span style="color:#9CDCFE;">number</span><span style="color:#E6E6E6;">;</span></span></code></pre><pre class="shiki slack-ochin vp-code-light"><code><span class="line"><span style="color:#002339;">width: </span><span style="color:#2F86D2;">number</span><span style="color:#002339;">;</span></span></code></pre></div><p>Specifies the <code>width</code> of the Button in pixels</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki slack-dark vp-code-dark"><code><span class="line"><span style="color:#E6E6E6;">height: </span><span style="color:#9CDCFE;">number</span><span style="color:#E6E6E6;">;</span></span></code></pre><pre class="shiki slack-ochin vp-code-light"><code><span class="line"><span style="color:#002339;">height: </span><span style="color:#2F86D2;">number</span><span style="color:#002339;">;</span></span></code></pre></div><p>Specifies the <code>height</code> of the Button in pixels</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki slack-dark vp-code-dark"><code><span class="line"><span style="color:#9CDCFE;">align</span><span style="color:#D4D4D4;">?:</span><span style="color:#E6E6E6;"> </span><span style="color:#CE9178;">&#39;left&#39;</span><span style="color:#E6E6E6;"> </span><span style="color:#D4D4D4;">|</span><span style="color:#E6E6E6;"> </span><span style="color:#CE9178;">&#39;center&#39;</span><span style="color:#E6E6E6;"> </span><span style="color:#D4D4D4;">|</span><span style="color:#E6E6E6;"> </span><span style="color:#CE9178;">&#39;right&#39;</span><span style="color:#E6E6E6;">;</span></span></code></pre><pre class="shiki slack-ochin vp-code-light"><code><span class="line"><span style="color:#2F86D2;">align</span><span style="color:#7B30D0;">?:</span><span style="color:#002339;"> </span><span style="color:#A44185;">&#39;left&#39;</span><span style="color:#002339;"> </span><span style="color:#7B30D0;">|</span><span style="color:#002339;"> </span><span style="color:#A44185;">&#39;center&#39;</span><span style="color:#002339;"> </span><span style="color:#7B30D0;">|</span><span style="color:#002339;"> </span><span style="color:#A44185;">&#39;right&#39;</span><span style="color:#002339;">;</span></span></code></pre></div><p>Specifies the horizontal alignment of the Button in the container. Default value is <code>left</code></p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki slack-dark vp-code-dark"><code><span class="line"><span style="color:#9CDCFE;">target</span><span style="color:#D4D4D4;">?:</span><span style="color:#E6E6E6;"> </span><span style="color:#9CDCFE;">string</span><span style="color:#E6E6E6;">;</span></span></code></pre><pre class="shiki slack-ochin vp-code-light"><code><span class="line"><span style="color:#2F86D2;">target</span><span style="color:#7B30D0;">?:</span><span style="color:#002339;"> </span><span style="color:#2F86D2;">string</span><span style="color:#002339;">;</span></span></code></pre></div><p>Specifies the value of the <code>&quot;target&quot;</code> attribute for the button <code>target</code>.</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki slack-dark vp-code-dark"><code><span class="line"><span style="color:#9CDCFE;">backgroundColor</span><span style="color:#D4D4D4;">?:</span><span style="color:#E6E6E6;"> </span><span style="color:#9CDCFE;">string</span><span style="color:#E6E6E6;">;</span></span></code></pre><pre class="shiki slack-ochin vp-code-light"><code><span class="line"><span style="color:#2F86D2;">backgroundColor</span><span style="color:#7B30D0;">?:</span><span style="color:#002339;"> </span><span style="color:#2F86D2;">string</span><span style="color:#002339;">;</span></span></code></pre></div><p>Specifies the hex value for the <code>background-color</code> of the button</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki slack-dark vp-code-dark"><code><span class="line"><span style="color:#9CDCFE;">borderColor</span><span style="color:#D4D4D4;">?:</span><span style="color:#E6E6E6;"> </span><span style="color:#9CDCFE;">string</span><span style="color:#E6E6E6;">;</span></span></code></pre><pre class="shiki slack-ochin vp-code-light"><code><span class="line"><span style="color:#2F86D2;">borderColor</span><span style="color:#7B30D0;">?:</span><span style="color:#002339;"> </span><span style="color:#2F86D2;">string</span><span style="color:#002339;">;</span></span></code></pre></div><p>Specifies the hex value <code>border-color</code> for the button</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki slack-dark vp-code-dark"><code><span class="line"><span style="color:#9CDCFE;">borderRadius</span><span style="color:#D4D4D4;">?:</span><span style="color:#E6E6E6;"> </span><span style="color:#9CDCFE;">number</span><span style="color:#E6E6E6;">;</span></span></code></pre><pre class="shiki slack-ochin vp-code-light"><code><span class="line"><span style="color:#2F86D2;">borderRadius</span><span style="color:#7B30D0;">?:</span><span style="color:#002339;"> </span><span style="color:#2F86D2;">number</span><span style="color:#002339;">;</span></span></code></pre></div><p>Specifies the <code>border-radius</code> value for the button in pixels</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki slack-dark vp-code-dark"><code><span class="line"><span style="color:#9CDCFE;">borderSize</span><span style="color:#D4D4D4;">?:</span><span style="color:#E6E6E6;"> </span><span style="color:#9CDCFE;">number</span><span style="color:#E6E6E6;">;</span></span></code></pre><pre class="shiki slack-ochin vp-code-light"><code><span class="line"><span style="color:#2F86D2;">borderSize</span><span style="color:#7B30D0;">?:</span><span style="color:#002339;"> </span><span style="color:#2F86D2;">number</span><span style="color:#002339;">;</span></span></code></pre></div><p>Specifies the <code>border-width</code> value in pixels</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki slack-dark vp-code-dark"><code><span class="line"><span style="color:#9CDCFE;">fontSize</span><span style="color:#D4D4D4;">?:</span><span style="color:#E6E6E6;"> </span><span style="color:#9CDCFE;">number</span><span style="color:#E6E6E6;">;</span></span></code></pre><pre class="shiki slack-ochin vp-code-light"><code><span class="line"><span style="color:#2F86D2;">fontSize</span><span style="color:#7B30D0;">?:</span><span style="color:#002339;"> </span><span style="color:#2F86D2;">number</span><span style="color:#002339;">;</span></span></code></pre></div><p>Specifies the <code>font-size</code> value in pixels</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki slack-dark vp-code-dark"><code><span class="line"><span style="color:#9CDCFE;">textColor</span><span style="color:#D4D4D4;">?:</span><span style="color:#E6E6E6;"> </span><span style="color:#9CDCFE;">string</span><span style="color:#E6E6E6;">;</span></span></code></pre><pre class="shiki slack-ochin vp-code-light"><code><span class="line"><span style="color:#2F86D2;">textColor</span><span style="color:#7B30D0;">?:</span><span style="color:#002339;"> </span><span style="color:#2F86D2;">string</span><span style="color:#002339;">;</span></span></code></pre></div><p>Specifies the hex value for the <code>color</code> of the text</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki slack-dark vp-code-dark"><code><span class="line"><span style="color:#9CDCFE;">withBackground</span><span style="color:#D4D4D4;">?:</span><span style="color:#E6E6E6;"> </span><span style="color:#9CDCFE;">boolean</span><span style="color:#E6E6E6;">;</span></span></code></pre><pre class="shiki slack-ochin vp-code-light"><code><span class="line"><span style="color:#2F86D2;">withBackground</span><span style="color:#7B30D0;">?:</span><span style="color:#002339;"> </span><span style="color:#2F86D2;">boolean</span><span style="color:#002339;">;</span></span></code></pre></div><p>Set to <code>true</code> if <code>Button</code> is nested in a <code>Background</code> component. Neccessary for good Outlook compatibility.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>This component also expresses all of the <a href="https://react.dev/reference/react-dom/components/common" target="_blank" rel="noreferrer">Common Component Props</a> for <code>ComponentProps&lt;&#39;a&#39;&gt;</code>.</p></div>`,32);function D(n,h,u,C,m,g){return p(),e("div",null,[s("h2",r,[a(o(n.$frontmatter.title)+" ",1),i]),s("p",null,o(n.$frontmatter.description),1),y,d,s("p",null,"Install the "+o(n.$frontmatter.type)+" from your command line",1),E])}const v=l(c,[["render",D]]);export{b as __pageData,v as default};