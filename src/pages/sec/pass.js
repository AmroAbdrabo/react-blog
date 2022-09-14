// Program Analysis for System Security and Reliability
// Import the fantastic medium style (Credit: https://codepen.io/lucagez/pen/bQObBe)
import '../../styling/article.css';
import { MathComponent } from "mathjax-react";

function Article(){
    //  <MathComponent tex={String.raw`\int_0^1 x^2\ dx`} />
    return <>
    <div className="topnav" style={{ backgroundColor: "rgb(91, 16, 112)" }}>
      <a
        className="active"
        href="index.html"
        style={{ backgroundColor: "rgb(146, 135, 211)" }}
      >
        &nbsp; &nbsp; Home
      </a>
    </div>
    <div className="container">
      <div className="meta">
        <div
          className="image"
          style={{
            background: `url("/img/ether.jpg")`,
            backgroundSize: "cover",
            width: "95%",
            backgroundPosition: "center"
          }}
        />
        <div className="info">
          <h1>Program Analysis for Security and Reliability </h1>
          <p className="subtitle">Course by Prof. Dr. Vechev</p>
          <div className="author">
            <div className="authorImage" />
            <div className="authorInfo">
              <div className="authorName">
                <a href="https://github.com/AmroAbdrabo">Amro Abdrabo</a>
              </div>
              <div className="authorSub">
                April 2022 <span className="median-divider"> </span>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="article">
        <h1> Data flow analysis in Datalog</h1>
        <p>Suppose we are given the following code (line numbering omitted): <br/><br/></p>
        <div
          style={{
            
           
            width: "fitContent",
            paddingRight: 35,
            marginBottom: 40
          }}
        >
          <pre style={{ border: "0ch",  width: "fitContent",  background: "rgb(230, 230, 230)", borderRadius: "20px" }}>
          {"\n"}
            {"     "}
            <code className="language-pascal" style ={{  background: "rgb(230, 230, 230)",  borderRadius: "20px"}}>
              
              {" "}x = source(){"\n"}
              {"      "}y = x + z{"\n"}
              {"      "}if (y &gt; 0){"{"}
              {"\n"}
              {"        "}y = x + 4{"\n"}
              {"      "}
              {"}"}
              {"\n"}
              {"      "}else {"{"}
              {"\n"}
              {"        "}z = 2{"\n"}
              {"      "}
              {"}"}
              {"\n"}
              {"      "}sink(y){"\n"}
              {"     "}
            </code>
            {"\n"}
            {"     "}
          </pre>
        </div>
        <p>The semantics are</p>
        <ul>
          <li>
            {" "}
            Reading untrusted input<code> x = source()</code>
          </li>
          <li>
            Assignments: <code> y = x + z </code>
          </li>
          <li>Branching</li>
          <li>
            Output sink: <code>sink(y)</code> outputs the value of variable{" "}
            <code>y</code> to output
          </li>
        </ul>
        <p />
        <p>
          To write a datalog program that captures these semantics (encodes these
          programs), then we have:
        </p>
        <p></p>
        <pre
          style={{
            borderStyle: "solid",
            borderRadius: "0.5cm",
            borderColor: "blueviolet",
            overflow: "scroll"
          }}
        >
          {"\n"}
          {"  "}// L: X = source() {"\n"}
          {"  "}
          .decl source(L: number, X: symbol)
          {"  "}
          {"\n"}
          {"\n"}
          {"  "}// L: sink(X) {"\n"}
          {"  "}
          .decl source(L: number, X: symbol) {"\n"}
          {"\n"}
          {"  "}// L: X = Y+Z {"\n"}
          {"  "}
      
            .decl assign(L: number, X: symbol, Y: symbol, Z: symbol)
          {" "}
          {"\n"}
          {"\n"}
          {"  "}// L1: ... {"\n"}
          {"  "}// L2: ... {"\n"}
          {"  "}
          .decl next(L1: number, L2: number) {"\n"}
          {"\n"}
          {"  "}// L1: if(X) {"{"}  {"\n"}
          {"  "}//   L2:{"  "}...  {"\n"}
          {"  "}//  {"}"} {"\n"}
          {"  "}//{" "}
            {" "}
             else {"{"}{" \n"} 
             {"  "}// L3: ... {"\n"}
             {"  // }"}
        {" "}
          {"\n"}
          {"  "}
          .decl if(L1: number, L2: number, L3: number) {"\n"}
          {"\n"}
          {"  "}//{" "}
          
            if{"   "}
            {"{"}{" "}
          {" "}
          {"\n"}
          {"  "}// {"    "}...  {"\n"}
          {"  "}//  L2: {"}"}  {"\n"}
          {"  "}// else {"{"}  {"\n"}
          {"  "}// {"     "}...  {"\n"}
          {"  "}//  L3: {"}"}  {"\n"}
          {"  "}//  L1: ...  {"\n"}
          {"  "}
          .decl join(L1: number, L2: number, L3: number) {"\n"}
          {"  "}
        </pre>
        <p />
        <p>
          A value is unsanitized if its value is derived from user input (ignoring
          implicit control-flow dependencies). Here we see a datalog program that
          calculates at every line all tainted values <b> before and after </b>
          execution of that line and calculates if a sink may accept an
          unsanitised user input:
        </p>
        <p></p>
        <pre
          style={{
            borderStyle: "solid",
            borderRadius: "0.5cm",
            borderColor: "blueviolet",
            overflow: "scroll"
          }}
        >
          {"\n"}
          {"  "}// derived predicates{"\n"}
          {"  "}.decl taintedBefore(L:number, X:symbol){"\n"}
          {"  "}.decl taintedAfter(L:number, X:symbol){"\n"}
          {"\n"}
          {"  "}// The sink argument at label L is tainted{"\n"}
          {"  "}.decl unsanitized(L: number){"\n"}
          {"  "}.output unsanitized{"\n"}
          {"\n"}
          {"  "}// After execution of source at line L (unsanitised user input){" "}
          {"\n"}
          {"  "}// the value X after line L is unsanitised{"\n"}
          {"  "}taintedAfter(L, X) :- source(L, X).{"\n"}
          {"\n"}
          {"  "}// Line L is unsanitized if X is the outputted at line L {"\n"}
          {"  "}// and X was tainted before line L{"\n"}
          {"  "}unsanitized(L) :- sink(L, X), taintedBefore(L, X).{"\n"}
          {"\n"}
          {"  "}// X is tainted after line L if it was tainted {"\n"}
          {"  "}// before line L and it was not assigned something else{"\n"}
          {"  "}taintedAfter(L, X) :- taintedBefore(L, X), !assign(L, X, _, _).
          {"\n"}
          {"  "}
          {"\n"}
          {"  "}// X is tainted after L if it was assigned at a tainted value on L
          {"\n"}
          {"  "}taintedAfter(L, X) :- assign(L, X, Y, _), taintedBefore(L, Y).
          {"\n"}
          {"  "}taintedAfter(L, X) :- assign(L, X, _, Z), taintedBefore(L, Z).
          {"\n"}
          {"\n"}
          {"  "}// X is tainted before a line if it was tainted {"\n"}
          {"  "}// after an earlier line (all possible cases){"\n"}
          {"  "}taintedBefore(L2, X) :- next(L1, L2), taintedAfter(L1, X).{"\n"}
          {"  "}taintedBefore(L2, X) :- if(L1, L2, _), taintedAfter(L1, X).{"\n"}
          {"  "}taintedBefore(L3, X) :- if(L1, _, L3), taintedAfter(L1, X).{"\n"}
          {"  "}taintedBefore(L1, X) :- join(L1, L2, _), taintedAfter(L2, X).
          {"\n"}
          {"  "}taintedBefore(L1, X) :- join(L1, _, L3), taintedAfter(L3, X).
          {"\n"}
          {"  "}
        </pre>
        <p />
        <p>
          Now assume we have a sanitize function <code>sanitize(x)</code> which
          can be used to "sanitize" variables. To include this functionality in
          Datalog, note that we already had a similar functionality when we
          specified x to be tainted-after only if it is NOT assigned to something
          else.
        </p>
        <pre style={{ borderRadius: "0.2cm" }}>
          {"\n"}
          {"  "}taintedAfter(L, X) :- taintedBefore(L, X), !assign(L, X, _, _),
          !sanitize(L, X).{"\n"}
          {"  "}
        </pre>
        <p>
          The full project for a taint-analyzer on Ethereum smart contracts can be
          found at this
          <a href="https://github.com/AmroAbdrabo/ethereum-sc-taint-analyzer">
            {" "}
            GitHub link
          </a>
          . As for now, let us focus on ways to attack models so that they
          (perhaps correctly) output "garbage dump" when they are fed an image of
          a WOKO student housing complex.
        </p>
        <h1> Black-box Attacks on Machine Learning Models</h1>
        <p>
          The defining question of this topic is whether ML can be deployed to the
          real world. Let us see some of the attacks against ML models.
        </p>
        <p>
          Imagine you are training a model to detect pneumothorax in lungs using a
          chest X-ray. The doctor attaches a drain to the chest and the patient
          has an X-ray of his chest taken. Now, when the ML model is trained on
          this image, it will notice the presence of a drain. Of course, the
          probability that a patient has pneumothorax given he has a drain is much
          higer than the probability of them having the disease with no drain
          attached. And that is exactly what the model would do. Given an X-ray
          showing a drain, its prediction will be biased towards showing presence
          of the disease, unlike the doctor who would make his decision
          independent of the drain (to some extent).
        </p>
        <p>There are certain threats to ML security:</p>
        <p></p>
        <ul>
          <li>Model inversion: inverting the model to obtain the dataset</li>
          <li>
            Membership inference: given the model, knowing whether a sample was
            used in the training dataset
          </li>
          <li>
            Adversarial attack: given a correctly classified image, can the image
            be slightly changed so that it is no longer correctly classified
          </li>
          <li>
            Data poisoning: adversary injects into the training set a few
            correctly classified images with a small and specific pixel pattern
            that biases the model towards that pixel pattern
          </li>
          <li>
            Backdoor ML: involves the use of data poisoning but with the attack
            component being incorrect label produced during inference
          </li>
        </ul>
        <p />
        <p>
          All images are affected by adversarial attacks, and even the best model
          is affected by adversarial attacks.
        </p>
        <p>
          The problem is that state of the art models are accurate but very
          brittle.
        </p>
        <h2>Adversarial robustness</h2>
        <p>
          In order to achieve adversarial robustness, one must specify two
          components:
        </p>
        <ul>
          <li>
            Specification: what are the allowed changes to the image (e.g.
            rotation, sheering, lighting, scaling, masked parts, etc.)
          </li>
          <li>
            Optimization: given the image, embedded into the input space, and the
            allowed modifications (defining a hyperplane of samples around the
            original input), can we obtain an incorrect label for a sample from
            this hyperplane.
          </li>
        </ul>
        <img
          src="/img/spec_opt.PNG"
          alt=""
          style={{
            width: "90%",
            height: "auto",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block"
          }}
        />
        <p />
        <p>
          Recall the task of model training is to find
          <MathComponent tex={String.raw` \text{argmin}_{\theta} E_{(\textbf{x, y}) \sim  D} \ loss(\theta, \textbf{x}, \textbf{y}) `} display={true}/>
          
        </p>
        <p>
          However, for adversarial attack the task is to find, 
          <MathComponent tex={String.raw` \text{argmax}_{|| \delta|| < \epsilon }  \ loss(\theta, \textbf{x}+\delta, \textbf{y}) `} display={true}/>
          
        </p>
        <p>with the update being,</p>
        <p>
        <MathComponent tex={String.raw` \delta \leftarrow \delta - \nabla loss(\theta, \textbf{x}+\delta, \textbf{y})  `} display={true}/>
          
        </p>
        <h2>Attack taxonomy</h2>
        <p>
          <img
            src="/img/att_tax.png"
            alt=""
            style={{
              width: "90%",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
          />
        </p>
        <p>
          Note that as we go right-down the attack difficulty increases, and that
          we can aim for attacks that change the label to some defined target
          label or just an incorrect label (easier).
        </p>
        <h2>Generating Perturbations</h2>
        <br />
        <p className="subtitle">Algorithm I: Random Perturbation</p>
        <div className="algo" style={{width: "fitContent", borderRadius: "20px"}}>
          <pre className="algo_pre"  style={{ backgroundColor: "rgb(230, 230, 230)", borderRadius: "20px", paddingRight: "25px" }}>
          {"\n"}
            <code className="language-python"  style={{  backgroundColor: "rgb(230, 230, 230)" }}>
              
              {"  "}δ = 0{"\n"}
              {"  "}while y != argmax<sub>i</sub> f<sub>i</sub>(x+δ):{"\n"}
              {"    "}δ &lt;- U(0,1){"  "}
              {"\n"}{" "}
            </code>
            {"\n"}{" "}
          </pre>
        </div>
        <p>
          The algorithm keeps sampling a uniformly distributed perturbation until
          the classifier outputs the adversarial target class. This is of course
          the simplest approach and achieves 0 to 10% attack success rate (ASR)
          even after half a million queries.
        </p>
        <br/>
        <p className="subtitle">Algorithm II: Genetic Perturbations</p>
        <p>
          The high level idea is creating initial generation, with size N, based
          on the original input <b>x</b> and the p-code explains the rest
        </p>
        <div className="algo" style={{width: "fit-content", borderRadius: "20px"}}>
          <pre className="algo_pre"  style={{ backgroundColor: "rgb(230, 230, 230)", borderRadius: "20px", paddingRight: "25px" }}>
          {"\n"}
            <code className="language-python"  style={{  backgroundColor: "rgb(230, 230, 230)" }}>
              {"\n"}
              {"  "}// Create initial generation{"\n"}
              {"  "}For i = 1..N {"\n"}
              {"    "}P <sup>0</sup>
              <sub>i</sub> &lt;- <b>x + U(-δ, δ)</b> {"\n"}
              {"  "}For all generations do:{"\n"}
              {"      "}For every member of the generation do:{"\n"}
              {"          "}Compute the fitness of the member {"\n"}
              {"      "}If label of "most fit" member is the target t:{"\n"}
              {"          "}return success{"\n"}
              {"      "}Compute selection probabilities ("fitter" members more
              likely selected){"\n"}
              {"      "}For every member of the generation do:{"\n"}
              {"          "}Apply mutations and clipping to new child input {"\n"}
              {"          "}Add mutated child to next generation{"\n"}
              {"      "}Adaptively update α (mutation range) and ρ (mutation
              prob.) variables {"\n"}{" "}
            </code>
            {"\n"}{" "}
          </pre>
        </div>
        <p>
          The algorithm achieves 95% to 100% ASR using around 100,000 queries. A
          possible optimization is that instead of independently modifying every
          single pixel, to instead modify nearby pixels together using a smaller
          noise mask:
        </p>
        <br/>
        <img
          src="/img/genatt.PNG"
          alt=""
          style={{
            width: "70%",
            height: "auto",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block"
          }}
        />
        <p>This in turn drives the number of queries down to ~20,000.</p>
        <br/>
        <div className="algo" style={{width: "fit-content", borderRadius: "20px"}}>
          <pre className="algo_pre"  style={{ backgroundColor: "rgb(230, 230, 230)", borderRadius: "20px", paddingRight: "25px" }}>
          {"\n"}
            <code className="language-python"  style={{  backgroundColor: "rgb(230, 230, 230)" }}>
              {"\n"}
              {"  "}δ = 0{"\n"}
              {"  "}p<sub>y</sub> = f<sub>y</sub>(x){"\n"}
              {"  "}while y = argmax<sub>i</sub> f<sub>i</sub> (x+δ):{"\n"}
              {"    "}pick randomly and without replacement q ∈ Q{"\n"}
              {"    "}for 𝛼 ∈ {"{"}𝜀, -𝜀{"}"} do{"\n"}
              {"      "}p<sub>y</sub>
              <sup>new</sup>
              {"  "}= f<sub>y</sub> (x + 𝛿 + 𝛼q) {"\n"}
              {"      "}if p<sub>y</sub>
              <sup>new</sup> &lt; p<sub>y</sub>
              {"\n"}
              {"          "}𝛿 = 𝛿 + 𝛼q{"\n"}
              {"          "}p<sub>y</sub> = p<sub>y</sub>
              <sup>new</sup>
              {"\n"}
              {"          "}break{"\n"}{" "}
            </code>
            {"\n"}{" "}
          </pre>
        </div>
        <p>
          where Q is an orthonormal basis for image inputs. This basis can be the
          normal cartesian basis (if you think of each N-by-N image as vector of
          length \(N^2\) then this is the normal canonical basis for these
          vectors). Another basis is the DCT (discrete cosine transform) basis
          (non-coincidentally used in JPEG image compression):
        </p>
        <p>
          The idea is that 9x9 images are encoded using 9 numbers which represent
          the coefficients of the following 9x9 single-channeled matrices:
          <img
            src="/img/dct.PNG"
            alt=""
            style={{
              width: "30%",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
          />
        </p>
        <p>
          Each of these 9 squares has entries determined by the discrete cosine
          function sampled at fixed points. Reducing the size of the basis to
          something below 9 will result in some compression for 9x9 images (see
          weitz.de/dct/). Same idea applies for 32x32 images using 32*32=1024 DCT
          bases matrices. Hence, dimensionality reduction can be achieved by
          limited the number of basis matrices.
        </p>
        <p>
          For untargeted adversarial attacks, the DCT-basis SimBA algorithm
          performs better with ~1000 queries (~97% ASR). However, the
          Cartesian-basis SimBA performs better on the targeted case with ~10,000
          queries and 100% ASR.
        </p>
        <br/>
        <p className="subtitle">Algorithm IV: Boundary Attack</p>
        <p>
          The most beautiful attack in my opinion: this attack walks in reverse by
          starting with a random noise image, represented as <b>x</b> in original
          input space, and then repeatedly does a step which consists of a random
          orthogonal step followed by a step toward the original meaningful image.
          The algorithm can be visualized as:
          <br />
          <img
            src="/img/attboundary.PNG"
            alt=""
            style={{
              width: "80%",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
          />
        </p>
        <br />
        <p>The idea is summarized as,</p>
        <blockquote style={{ fontSize: "x-large" }}>
          How close can we get to the actual image so as to resemble the image
          while still being classified incorrectly?
        </blockquote>
        <p />
        <p>
          This attack is decision based as it relies only on hard labels and uses
          gaussian noise for the orthogonal perturbations.
        </p>
        <br/>
        <p className="subtitle">Algorithm V: Guessing smart</p>
        <p>
          Also decision-based attack, this attack takes two images, the original
          and the target label, and applies boundary attack by changing only the
          relevant regions in the original image. This relevant region is obtained
          by the mask which emphasizes the areas of both images which are
          different. This helps prevent modiying background pixels depicting the
          sky for example. It applies perlin noise on the mask.
        </p>
      </main>
    </div>
  </>
  

}

export default Article;