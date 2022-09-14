// Program Analysis for System Security and Reliability
// Import the fantastic medium style (Credit: https://codepen.io/lucagez/pen/bQObBe)
import '../../styling/article.css';
import { MathComponent } from "mathjax-react";

function Article(){
    //  <MathComponent tex={String.raw`\int_0^1 x^2\ dx`} />
    return <>
    <div className="topnav">
      <a className="active" href="index.html">
        Home
      </a>
    </div>
    <div className="container">
      <div className="meta">
        <div className="image" />
        <div className="info" >
          <h1>System Security </h1>
          <p className="subtitle">Lecture Notes</p>
          <div className="author" style={{paddingBottom: "10px", borderBottom: "2px solid black"}}>
            <div className="authorImage" />
            <div className="authorInfo">
              <div className="authorName">
                <a href="https://github.com/AmroAbdrabo">Amro Abdrabo</a>
              </div>
              <div className="authorSub">
                Feb. 22 <span className="median-divider"> </span>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="article">
        <h2>
          {" "}
          Lecture 4: Introduction to Security on Commodity Systems (laptops,
          smartphones){" "}
        </h2>
        <br />
        <h2 className="subtitle">
          Guaranteeing security with trusted OS and untrusted peripherals
        </h2>
        <p className="subtopic">Application Security Requirements</p>
        <p></p>
        <ul>
          <li>
            <span style={{ color: "blue" }}> Launch-time integrity</span>:
            pristine/correct application was started or loaded (Prop 1). Required
            functionality: integrity (e.g. hash) verification of initial code,
            data
          </li>
          <li>
            <span style={{ color: "blue" }}> Run-time isolation </span>: no
            interference from malicious software, peripherals (Prop 2). Required
            functionality: prevention of unauthorized modification of app code and
            data, and prevention of runtime attack (e.g. code injection) that
            modify execution flow.
          </li>
          <li>
            <span style={{ color: "blue" }}> Secure persistent storage </span>{" "}
            (Prop 3). Required functionality: confidentiality, integrity
            protection of persistent data.
          </li>
        </ul>
        <p />
        <p>
          An application can be roughly split into code (requires Prop 1 and 2),
          volatile data (Prop 1 and 2), and persistent data (Prop 3).
        </p>
        <p className="subtopic">Intel Platform Overview</p>
        <p>At its core, an Intel platform consists of</p>
        <ul>
          <li>
            <span style={{ color: "blue" }}> Processor: </span> contains one or
            more CPUs (henceforth called cores)
          </li>
          <li>
            <span style={{ color: "blue" }}>Chipset:</span> connects the processor
            to RAM and peripherals
          </li>
          <li>
            <span style={{ color: "blue" }}> Peripherals:</span> connect via
            various bus-interfaces to the chipset
          </li>
        </ul>
        <p />
        <p className="subtopic">OS-based Security: Privilege Rings</p>
        <p>
          <b>Goal:</b> limit access to privileged instructions, I/O ports. CPU
          tracks current privilege level using 2 register bits. In order of
          decreasing privilege the rings are: ring 0 (kernel), ring 1 and 2
          (device drivers), ring 3 (applications).Today, only privilege levels 0
          and 3 are used as the device drivers are part of the kernel.
        </p>
        <p className="subtopic">OS-based Security: Memory Management Unit</p>
        <p>
          The MMU, inside the CPU, is responsible for translating virtual
          addresses to physical ones. It allows only the kernel to modify the CR3
          register and page tables. It ensures that each application has page
          tables designated for that app, and that no app can modify the CR3 reg.
          nor page tables.
        </p>
        <p className="subtopic">OS-based Security: Paging-based Security</p>
        <p>
          In each page table entry, there are 4 bits: supervisor bit (if set, page
          only accessible in ring 0), RW bits (read-write access), execution
          disable (ED) bit (prevents runtime code injection attack).
          <img
            src="/img/pagingsec.PNG"
            alt=""
            style={{
              width: "100%",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
          />
        </p>
        <p className="subtopic">Firewire DMA Attack</p>
        <p>
          Key idea: access to RAM is tightly controlled by the CPU, but this can
          be <b> circumvented through DMA </b>. The attacker uses a Firewire cable
          to connect to a (locked) PC and issue a DMA request to fetch the
          contents of RAM. The CPU is not in control of the data transfer
          operation.
        </p>
        <p>
          Attack mitigations are destroying/sealing the port (drastic), or
          disabling it from the OS. However, if there is a Thunderbolt port one
          can use a Thunderbolt-to-Firewire cable and achieve the attack.
        </p>
        <p className="subtopic">OS-based Security: DMA Remapping</p>
        <p>
          <img
            src="/img/dmaremap.PNG"
            alt=""
            style={{
              width: "100%",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
          />
        </p>
        <p>
          The IOMMU maps device addresses to physical addresses and controls DMA
          access to physical memory. In the picture immediately above, it prevents
          a malicious Network Interface Card from copying data into the page table
          and kernel secrets. Thanks to the IOMMU, malicious peripherals can no
          longer tamper or steal data from applications.
        </p>
        <p className="subtopic">Physical Access Attacks</p>
        <p>
          These attacks are harder to defend. One can simply remove the hard drive
          from a machine left unattended, or boot from USB key and copy the data
          out/change the passwords.
        </p>
        <p>
          <b> BIOS protection</b> Protecting the BIOS with a password is a myth as
          one can reset the BIOS using CLEAR, CLRPWD, etc. Removing the battery
          for around 5 minutes also resets the BIOS.
        </p>
        <p>
          <b>Disk encryption</b> The attacker cannot easily recover data from
          disk, and cannot boot from USB and change/see the data. The attacker can
          still erase the data. Disk encryption comes into two flavours. The first
          involves encrypting the disk using a key which is itself encrypted using
          the user's password. The encrypted key is stored with the disk. Note
          though that the attacker can brute force an <i>extracted </i> disk. The
          second approach is to use the password to encrypt the TPM's key, which
          is itself used to encrypt/decrypt the disk. This approach, while more
          secure, makes migrating the encrypted disk to another platform more
          difficult (need to migrate TPM as well). Note that in both approaches
          the OS keeps the key in memory in order to decrypt data from the disk
          on-the-fly, which leads to DRAM-based disk attacks.
        </p>
        <p className="subtopic">Cold Boot Attack</p>
        <p>
          The DRAM is implemented using capacitors. These capacitors of a DRAM are
          the memory "cells" of the DRAM. DRAM must be periodically refreshed in
          order for the charge to not decay. However, failure to refresh DRAM does
          not mean charge is lost immediately. The attacker still has 60 seconds
          to extract the DRAM and read its content; if the DRAM is cooled once
          unpluggged, then she has tens of minutes to do so.
        </p>
        <p>
          There exist several counter-measures to the cold boot attack. They are
        </p>
        <ul>
          <li>
            Erase key from memory on every (controlled) suspend
            <ul>
              <li>User needs to type the password more often</li>
              <li>Does not help sudden power loss</li>
            </ul>
          </li>
          <li>
            Prevent booting from external media
            <ul>
              <li>Does not prevent physically transferring DRAM</li>
            </ul>
          </li>
          <li>
            Physical protection
            <ul>
              <li>
                Responds to opening or low temperatures (expensive for commodity
                systems)
              </li>
            </ul>
          </li>
          <li>
            Avoid placing the key in memory (requires architectural changes)
          </li>
        </ul>
        <p />
        <p className="subtopic">
          OS-based Security: TPM Support for Launch-time Integrity
        </p>
        <p>
          The BIOS (assumed trusted) measures the bootloader, which measures the
          OS, which measures the application thereby creating a chain of trust:
          <img
            src="/img/secboot.PNG"
            alt=""
            style={{
              width: "100%",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
          />
        </p>
        <p className="subtopic">Storage Protection on Smartphones</p>
        <p>
          At boot, the OS asks PIN from user. The PIN is given to the CPU, and the
          CPU derives storage key from PIN and processor key. This prevents
          brute-forcing of <i>extracted</i> storage (storage must be decrypted on
          the same device where the CPU is).
        </p>
        <p>
          Throttling is often used to prevent brute force attacks on PIN. On the
          iPhone 5, 5 incorrect attempts result in 5 second waiting time, 6
          incorrect attempts result in 1 minute waiting time, 7 results in 5
          minute waiting time, and so forth for 8, 9, and 10 incorrect attempts.
          The number of attempts is thus stored in a counter in the NVRAM, which
          is NAND mirrored. For a 4-number PIN, the search space is not large and
          can be exhausted in 40 hours; however, throttling drastically slows down
          the attack. The idea here is then to remove the NVRAM after 6 attempts,
          copy from another NVRAM which has counter set to zero, and reconnect the
          modified NVRAM to the iPhone 5, which believes there has been no
          incorrect attempts.
        </p>
        <h2> Lecture 5: Trusted execution environments </h2>
        <br />
        <h2 className="subtitle">
          Guaranteeing security with untrusted OS and peripherals (hardware
          trusted)
        </h2>
        <h2> Lecture 6: Microarchitectural attacks </h2>
        <br />
        <h2 className="subtitle">
          Leveraging microarchitecture for cache side channel attacks
        </h2>
        <h2>Part 1: Background</h2>
        <p>
          <b> Architecture </b> is an abstract model, with an instruction set
          architecture that specifies the interface between software and hardware.
          ISA examples include x86, RISC-V, ARM. Architectural state includes
          registers, and main memory.
        </p>
        <p>
          <b>Microarchitecture</b> is the actual implementation of the
          architecture. It follows ISA specification. Examples are Intel Core i7
          (Haswell), AMD Ryzen, ARM Cortex-A53. The microachitectural state must
          not be readable by applications. The state comprises cache, reorder
          buffer, and branch prediction history.
        </p>
        <p style={{ fontSize: "1.4em" }}>
          {" "}
          <b> Cache</b>
        </p>
        <p>
          Cache misses require around 8 times more cycles than cache hits. To hide
          memory latency, processors rely on pipelining, branch prediction,
          out-of-order execution, and prefetching.
        </p>
        <p>
          In basic microachitectures, pipelined instructions consist of 5 phases:
          Instruction fetch (IF), instruction decode (ID), execute (EXE), memory
          access (MEM), and register write back (WB). Refer to video lecture for
          an example of OoO execution.
        </p>
        <h2>Part 2: Cache side channel attacks</h2>
        <p>
          Caches are shared across all applications on a processor. Cache
          misses/hits leak information. Attacker must control an application on
          the same processor/system.
        </p>
        <p style={{ fontSize: "1.4em" }}>
          {" "}
          <b> Cache side channels</b>
        </p>
        <p>
          <b>Flush and reload.</b> This attack relies on shared memory. The
          attacker flushes the cache, then accesses an address. If the address is
          loaded fast, then the victim accessed it. Otherwise, the victim did not
          access it.
        </p>
        <p>
          <b>Prime and probe</b> This attack <b>does not rely</b> on shared
          memory. The attacker fills the cache with his own data (prime), then
          accesses (probes) his data. If a piece of data is loaded slowly, then we
          know which cache block the victim accessed.
        </p>
        <p style={{ fontSize: "1.4em" }}>
          {" "}
          <b> Meltdown</b>
        </p>
        <p>
          First, let's begin with an introduction to virtual memory. Each process
          operates on its own separate virtual memory.
        </p>
        <ul>
          <li>
            From the point of view of a process, it is the only one using the
            system memory.
          </li>
          <li>
            This also creates isolation among processes: it is impossible for a
            process to reference the virtual address of a different process.
          </li>
        </ul>
        <p />
        <p>
          On a 64-bit OS the virtual memory address is 64-bit long; in practice,
          only 48 bits (\( \Rightarrow \) illusion of 256 TiB of memory!) are
          used. Therefore, if a process uses more memory than is available on main
          memory, some of its memory must be swapped to disk, or the process must
          be killed. For efficiency reaons, the OS{" "}
          <b> maps kernel addresses inside the virtual address space </b> of each
          process.
        </p>
        <p>Virtual address to physical address translation is via page tables:</p>
        <img
          src="/img/pagetable.PNG"
          alt=""
          style={{
            width: "100%",
            height: "auto",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block"
          }}
        />
        <p>
          A page table entry contains permission bits for a page: read-only page,
          executable page, or supevisor (kernel) page.
        </p>
        <p>
          Crucial to Metldown is the microachitectural implementation of a memory
          access:
        </p>
        <ol>
          <li>Check if address is cached (if yes, jump to 3)</li>
          <li>If not cached, obtain physical address by walking page tables</li>
          <li>Issue request for data at physical address</li>
          <li>Wait for reply</li>
          <li>
            Save value in{" "}
            <span style={{ color: "red" }}> temporary register</span> and cache
            the page walk translation
          </li>
          <li>
            Retire instruction:
            <ul>
              <li>Check if permissions are met (check PTE bits)</li>
              <li>
                If yes, save value in the reigster{" "}
                <span style={{ fontFamily: "monospace" }}>(eax)</span>; otherwise,
                flush pipeline and call OS exception handler
              </li>
            </ul>
          </li>
        </ol>
        <p />
        <p>The attack consists in these two lines of code:</p>
        <p style={{ fontFamily: "monospace" }}></p>
        <ol style={{ fontFamily: "monospace" }}>
          <li style={{ fontFamily: "monospace" }}>mov eax, [kernel address]</li>
          <li style={{ fontFamily: "monospace" }}>
            mov ebx, [probe_array + 4096*eax]
          </li>
        </ol>
        <p />
        <p>
          Even though the first instruction will generate an exception, the CPU
          will still prefetch data for the second instruction. Also note that each
          page is 4 KiB and that we fetch using only page start addresses
          (assuming
          <span style={{ fontFamily: "monospace" }}>probe_array</span> is
          page-aligned, i.e. points to the start of a page). This is because Intel
          x86 architectures do not prefetch across memory page boundaries.
        </p>
        <p>
          We then retrieve data from the{" "}
          <span style={{ fontFamily: "monospace" }}>probe_array</span> using a
          page-aligned index. If the data is loaded fast, then we know what values{" "}
          <span style={{ fontFamily: "monospace" }}>eax</span> stored. We execute
          the code repetitively until we find an address that is loaded fast, from
          which we can find the value of{" "}
          <span style={{ fontFamily: "monospace" }}> eax</span>.
        </p>
        <h2>
          {" "}
          Lecture 7: Software-only Root of Trust (Software-based Attestation){" "}
        </h2>
        <br />
        <h2 className="subtitle">
          How can you perform trustworthy executions on untrustworthy platforms
          (without HW support)?
        </h2>
        <p>
          Desired property: external entity can verify code execution even if
          there is malicious OS operating. <br /> <br />
          Advantages to hardware-based attestation:{" "}
        </p>
        <ul>
          {" "}
          <li>
            {" "}
            <b> Legacy devices</b> supported{" "}
          </li>
          <li>
            {" "}
            <b> Perform attestation</b> if TPM/SGX flawed{" "}
          </li>
          <li>
            {" "}
            <b> No secrets</b> required{" "}
          </li>
        </ul>
        <p />
        <p style={{ fontSize: "1.4em" }}>
          {" "}
          <b> Approaches</b>
        </p>
        <p></p>
        <ul>
          <li>
            Only allow software stored in ROM to execute. <br /> Problems <br />
            <ul>
              <li> Need to exchange ROM to update SW </li>
              <li>
                {" "}
                ROP attacks only need to modify pointers on the stack, not the
                code{" "}
              </li>
            </ul>
          </li>
          <li>
            ROM Bootloader loads SW to execute, reboot each time
            <br /> Problems <br />
            <ul>
              <li>Reboot cannot be remotly verified, and it is impractical</li>
            </ul>
          </li>
          <li>Secure multi-party computation is computationally expensive</li>
        </ul>
        <p />
        <p style={{ fontSize: "1.4em" }}>
          {" "}
          <b> Initial setting</b>
        </p>
        <p>
          An untrusted device D, and a trusted verifier V which knows the expected
          memory contents of D. V wants to obtain proof of D's memory content. V
          sends a challenge to D, and D then executes (a potentially) malicious
          verification function which returns the expected result.
        </p>
        <p style={{ fontSize: "1.4em" }}>
          {" "}
          <b> Naïve approach: strawman verification function</b>
        </p>
        <p></p>
        <ul>
          <li>
            <b>Approach 1:</b> Verifier asks device to compute a hash function
            over memory. Malicious code pre-computes and replays correct hash
            value.
          </li>
          <li>
            <b>Approach 2: </b> Verifier sends a random challenge K and the device
            then computes MAC over the memory using challenge as key. Malicious
            code computes correct checksum over expected memory content.
          </li>
        </ul>
        <p />
        <p style={{ fontSize: "1.4em" }}>
          {" "}
          <b> First (non-implemented) approach: reflection</b>
        </p>
        <p>
          Fill memory with pseudo-random content, clear system state, disable
          interrupts, compute hash over entire memory, and return hash and system
          state. Verifier checks duration of computation, hash, and system state.
        </p>
        <p style={{ fontSize: "1.4em" }}>
          {" "}
          <b> Second approach: Alien vs Quine</b>
        </p>
        <p>
          A verification function executes before SW is executed. The verification
          function must be measurable in terms of time, which means that
          processors with frequencies in the MHz are allowed (as microseconds can
          be measured), however processors with GHz with lead to uncertain time
          measurements as the duration will be on the order of nanoseconds.
          Assumption is that the verification function executes immediately after
          reboot. If a malicious code executes, it will introduce a time overhead
          which is detected.
        </p>
        <p style={{ fontSize: "1.4em" }}>
          {" "}
          <b>
            {" "}
            Third approach: SWATT (Software-based ATTestation for Embedded
            Devices)
          </b>
        </p>
        <p>
          Verifier sends nonce to device, which is then used for pseudo-random
          memory traversal to compute memory checksum. Verifier times checksum
          computation and verifies checksum. Malicious code must verify each
          memory access to replace memory reads of changed memory locations with
          expected content, resulting in a time overhead.
          <br />
          Steps:
        </p>
        <ol>
          <li>Pseudo-random generation (using seed from verifier)</li>
          <li>Address generation</li>
          <li>Memory read and compute transformation</li>
          <li>Compute checksum and rewind to first step</li>
        </ol>
        <p />
        <p>
          The advantage in SWATT lies in its fast exeuction: If an attacker were
          to check if a byte belongs to the malicious software, that would require
          an if statement which would require 3 more cycles per iteration (+13%
          increase per iteration).
        </p>
        <p style={{ fontSize: "1.4em" }}>
          {" "}
          <b> SWATT Assumptions</b>
        </p>
        <ul>
          <li>
            Verifier knows hardware configuration of device (clock speed in
            particular)
          </li>
          <li>No proxy attack (where device contacts faster host)</li>
          <li>Attacker can change SW but not HW</li>
          <li>
            Verification/checksum function cannot be optimized algebraically or
            code-wise
          </li>
        </ul>
        <p />
        <p>
          Drawback of the SWATT system is that the checksum is computed over
          entire memory, which does not scale to large memory sizes. Further,
          memory may contain dynamic data, or secrets. Solution is to design
          verification code that checks small part of the memory which contains
          checksum-computing code (partial memory verification). However, now the
          attacker can compute checksum over correct copy of memory. To prevent
          this memory copy attack, we need to include program counter and data
          pointer in the checksum.
        </p>
        <p style={{ fontSize: "1.4em" }}>
          {" "}
          <b> Fourth approach: Pioneer</b>
        </p>
        <p>
          Pioneer was designed for the Intel Pentium 4 microarchitecture:
          <img
            src="/img/xeon.png"
            alt=""
            style={{
              width: "60%",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
          />
          Notice that the trace cache can only handle 3 \( \mu \)ops per cycle,
          and so the idea is to design software-based attestation in such a way
          that no additional resources are available to perform additional
          (potentially malicious) operations without introducing a time overhead.
        </p>
        <p>
          The approach consists of these steps: <br />
        </p>
        <ol>
          <li>
            Verify verification code (hash function + checksum code) integrity
            through SW-only-root-of-trust attestation
          </li>
          <li>Set-up untampered code execution environment</li>
          <li>Execute target code</li>
        </ol>
        <img
          src="/img/pioneer.PNG"
          alt=""
          style={{
            width: "60%",
            height: "auto",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block"
          }}
        />
        <p />
        <p>This approach opens the way to two types of attacks:</p>
        <ul>
          <li>
            {" "}
            Execution tampering attacks
            <ul>
              <li>Running malicious OS/VMM at higher privilege level</li>
              <li>Getting control through interrupts and exceptions</li>
            </ul>
          </li>
          <li>
            Checksum forgery attacks
            <ul>
              <li>Memory copy attacks</li>
              <li>Code optimization</li>
              <li>Parallel execution</li>
              <li>Exploiting superscalar architecture</li>
            </ul>
          </li>
        </ul>
        <p />
        <p>
          One of these attacks (getting control through interrupts and exceptions)
          merits special attention as an attacker can install malicious exception
          and interrupt handlers. A naive solution would be to replace the
          interrupt handlers at some point in the execution of the checksum code.
          The problem is that the attacker can save cycles by skipping the code to
          replace the interrupt handlers. Or, if the checksum replaces the
          handlers after the computation is done, the attacker can insert a debug
          breakpoint that prevents execution. The solution is a "trick" which
          consists of writing the checksum to the address of the stack pointer.
          Once an interrupt is generated, the stack is reset with the values of
          the PC and flags thereby forcing the attacker to have to simulate the
          entire checksum computation and losing time.
        </p>
        <p>
          <b>Drawbacks</b>. Despite achieving code integrity and launch point
          integrity, Pioneer is not immune against proxy and overcloking attacks,
          nor does it provide control flow integrity.
        </p>
        <p className="subtopic">Sensor Network Key Establishment</p>
        <p>How to establish a shared secret?</p>
        <p>
          The idea is to use a short lived secret to establish a long-lived
          secret. The checksum is used as a short lived secret. Anyone in the
          network can compute the same secret but the point is to use the node's
          silicon ID as part of the computation so if a node wants to cheat and
          runs different code then it will be slower than the legitimate node
          which has the correct silicon ID value. Basing ourselves on the Guy
          Fawkes protocol for authenticated communication, we can derive this ICE
          key exchange protocol (A verifies B)
          <img
            src="/img/icekey.PNG"
            alt=""
            style={{
              width: "60%",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
          />
        </p>
        <h2>Lecture 8: Hardware-assisted security in ARM</h2>
        <h2>Part 1: ARM TrustZone Architecture</h2>
        <p>
          <span className="first-letter">S</span>oC are a characteristic of ARM
          devices. The CPU is not on a separate chip but shares a chip with a
          4G/5G modem, memory, Bluetooth and so on. There are{" "}
          <b> two protection domains</b> in ARM TrustZone:{" "}
          <span style={{ color: "red" }}>Normal world</span>, and{" "}
          <span style={{ color: "green" }}> secure world</span>
          <img
            src="/img/arm.png"
            alt=""
            style={{
              width: "60%",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
          />
          The secure monitor call allows controlled entry to the secure world. The
          CPU runs exclusively in one world, dependent on the NS bit, which can be
          read from the SCR - System Control Register.
        </p>
        <p>
          To enable memory protection, TrustZone partitions the memory via the
          following mechanisms: An address space controller (TZASC) controls
          access to on-chip memory. A memory adapter (TZMA) controls access to
          off-chip memory, or main memory. Finally, there are separate
          translations in the MMU, and cache tags have extra bit to indicate
          world. To enable the trusted part of an app to communicate with its
          untrusted component, there are memory partitions that are accessible by
          both.
        </p>
        <p>
          To enable device/peripheral access, a TZ Protection Controller (TZPC)
          controls access to peripherals. To prevent DoS by{" "}
          <span style={{ color: "red" }}>NW</span>, accesses by the{" "}
          <span style={{ color: "green" }}>SW</span> are given priority.
        </p>
        <p>
          A different TZ architecture is present in IoT and embedded low power
          devices, since the SMC is expensive to perform. Instead, to transition
          into SW, the NW code calls the Secure Gateway (SG) instruction and the
          BXNS and BLXNS allow switching back and forth.
        </p>
        <h2>Part 2: TZ-based Security Services</h2>
        <p>
          The first security mechanism we consider is the Trusted Execution
          Environment. To use the SW as a TEE, we can either provide a fixed ``TEE
          service" or provide a TEE kernel plus trusted apps. The latter option
          increases the size of the TCB but is much more flexible and hence is the
          option applied in practice.{" "}
          <img
            src="/img/teearch.png"
            alt=""
            style={{
              width: "60%",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
          />
          As seen from this figure, the interaction between the SW and NW is
          mediated by the untrusted OS. The User App passes pointer to memory
          address where input parameters reside. The TEE kernel/Trusted OS needs
          to provide 5 functionalities:
        </p>
        <ol>
          <li>Enable easy trusted app development</li>
          <li>Secure storage</li>
          <li>Device access (fingerprint, SIM card)</li>
          <li>Message passing and sanitization</li>
          <li>Cryptographic libraries</li>
        </ol>
        <p />
        <p>
          To deploy an application into the SW the app needs to be vetted by the
          device manufacturer; otherwise, the trusted OS would have to enforce
          isolation between trusted apps.
        </p>
        <p>
          Recall in SGX that remote attestation was built and consisted in
          checking CPU is legitimate and enclave code as expected. In TZ remote
          attestation can be implemented as follows
          <img
            src="/img/rematt.png"
            alt=""
            style={{
              width: "60%",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
          />
          where SK_dev is the device specific key only accessible in the SW.
        </p>
        <p>
          Secure boot is necessary for brand protection (e.g. iPhone runs only
          iOS), ensuring only the intended OS accesses security relevant features
          such as radio settings, andpermission based OS-level access control for
          3rd party apps. The process follows:
        </p>
        <ol>
          <li>
            Boot in SW supervisor mode
            <ul>
              {" "}
              <li>
                {" "}
                Code that executes first needs to be <b>integrity-protected</b>,
                eg. stored in the on-chip ROM{" "}
              </li>
            </ul>
          </li>
          <li>
            Verify boot-loader
            <ul>
              <li>
                Immutable signature verification routine checks that the hash of
                the boot loader matches with \( K^{"{"}\text{"{"}pub{"}"}
                {"}"} ( K^{"{"}\text{"{"}priv{"}"}
                {"}"} (H(\text{"{"}code{"}"}))) \) where the public key is burned
                into the on-chip ROM, as well as the signed hash
              </li>
            </ul>
          </li>
          <li>
            Pass control to NW and boot loader
            <ul>
              <li>Boot loader can verify the integrity of the rest of the OS</li>
            </ul>
          </li>
        </ol>
        <p />
        <p>
          The next security mechanism is full-disk encryption, which protects user
          data against theft. The main idea is to derive disk encryption key from
          SW device key and password/PIN. Rate-limit password/PIN attempts to slow
          down offline attacks. The challenge is that off-chip non-volatile memory
          is susceptible to replay attacks (rate limit bypassed), and NVRAM is not
          always available on-chip.
        </p>
        <p>
          In hardware-backed key store, the goal is to protect the secrets of
          third party applications against malicious software in the NW. One
          approach is that we can expose a key store API to all third party
          smartphone applications that gives functions like a create a key, export
          a public key, sign the private key, etc. The key idea is that the
          interface should be designed in such a way that the private key never
          leaves the secure world. The problem is that untrusted OS can sign
          arbitrary content with the stored key (almost as good having as the
          private key).
        </p>
        <p>
          Finally, an advantage of TZ over SGX is that TZ includes touchscreen
          drivers to TEE kernel. However, it is hard for the user to distinguish
          between a UI drawn by TEE kernel vs a normal world UI.
        </p>
        <h2>
          Lecture 9: Designing Secure Systems based on Trustworthy Computing and
          Attestation
        </h2>
        <p>
          <span className="first-letter">C</span>ore question: how can we achieve
          integrity assurance for code execution on remote platforms if part of
          the system is untrusted? To validate the local system we can not rely on
          the local system to show us that the system is working OK, since the
          local system can be corrupted and display no issues upon verification.
          We therefore depend on a trusted external verifier. We assume the local
          hardware is correct, i.e. the hardware is the <b>root of trust</b>. We
          assume a remote adversary (launches network-based attacks).
        </p>
        <p>
          Hardware-based backdoors like the type introduced{" "}
          <a href="https://www.bloomberg.com/news/features/2018-10-04/the-big-hack-how-china-used-a-tiny-chip-to-infiltrate-america-s-top-companies">
            here
          </a>{" "}
          are hard to defend against and require the use of specialized X-ray
          devices to compare, at the gate level, a normal chip versus a suspected
          chip.
        </p>
        <p>
          There are currently 3 approaches to achieve trustworthy execution
          (evaluated metric is size of TCB-trusted computing base):
        </p>
        <ul>
          <li>Program code in ROM</li>
          <li>Secure boot</li>
          <li>Virtual-machine-based isolation</li>
        </ul>
        <h2>Program code in ROM</h2>
        <p>
          This approach consists of keeping entire program in ROM. <br />
          <b>Advantages:</b> simplicity and that the adversary cannot inject any
          additional software. <br /> <b> Disadvantages: </b> software cannot be
          updated without exchanging the ROM, adversary can use
          control-flow-attack (ROP), and the entire system is in TCB (no
          isolation). Verdict: impractical since code needs to be updated.
        </p>
        <h2>Secure or verified boot</h2>
        <p>
          The bootloader, which is in read only memory, loads other pieces of
          software and verifies digital signatures on each piece of software.{" "}
          <br />
          <b>Advantages:</b> only approved software can be loaded. <br />
          <b>Disadvantages:</b> Large OS almost certainly has vulnerability thus
          isolation amongst components not guaranteed \(\rightarrow \) entire
          system in TCB. The bootloader only verifies at
          <b>launch time</b> however at runtime a ROP attack may be going on.
        </p>
        <p>
          Note that signed code is not enough since the signing key may be
          compromised and an attacker thus signing his malicious software with a
          trusted signing key. Further, rollback attacks to previous signed
          software which was found to be vulnerable need to be prevented
          \(\rightarrow\) append-only hash chain in NV-RAM.
        </p>
        <h2>Virtual-machine-based isolation</h2>
        <p>
          Consists of isolating applications by executing them inside different
          virtual machines. <br />
          <b>Advantages:</b> VMM (VM monitor) smaller than OS and assumed to be
          secure, smaller TCB, isolation between applications.
          <br /> <b>Disadvantages:</b> VMM usually still large and part of TCB,
          relatively complex for the average user, and complicates interaction
          between applications.
        </p>
        <p>
          A verifier can be thought of as a reference to a "golden" database of
          expected software. A verifier sends a nonce to a system it wants to
          verify and receives from the system Sig(nonce, code).
        </p>
        <p>
          Given that systems need to be compatible with legacy vulnerable software
          the only approach is to achieve security for small subset of the system.
          The approach has 3 steps:
        </p>
        <ol>
          <li>Establish isolated execution environment (EE) through hardware</li>
          <li>Externally validate correctness of EE via remote attestation</li>
          <li>
            Enable secure local execution and fetching of secret data through
            sealed storage
          </li>
        </ol>
        <p>
          The Trusted Computing Group (TCG) proposed a Trusted Platform Module
          (TPM) chip which is a low-cost passive device that provides platform
          identity, remote attestation (via PCRs + AIK-attestation identity key to
          sign PCR), sealed storage (via SRK-storage root key), and a secure
          counter. To simplify matters, we assume there is only a{" "}
          <b>public-private key pair per TPM</b> that is being used for all the
          operations. The TPM will store measurements (hashes) of code that has
          executed. These hashes represent{" "}
          <span style={{ color: "blue" }}>platform configuration</span>. The
          question is how to securely store potentially infinitely long list of
          hashes \(H_1, ..., H_n\) in finite list of registers? The solution is
          that the untrusted OS stores the actual list of hashes \(H_1, ..., H_n\)
          and <span style={{ color: "blue" }}>PCR</span> inside TPM ensures
          integrity of list by the following operations: at time 0, \(\text{"{"}
          PCR{"}"}_{"{"}T0{"}"} \leftarrow 0; \) then at time T1, \( \text{"{"}PCR
          {"}"}_{"{"}T1{"}"} \leftarrow \) \( H(\text{"{"}PCR{"}"}_{"{"}T0{"}"} ||
          H1) \) and so forth. Note that PCR10 is usually used since it is
          non-resetable to 0 except by reboot.
        </p>
        <p>
          TPM is neither tamper-responsive nor tamper-proof and the private key
          can be read using scanning electron microscope. A famous attack on TPM
          is TPM-Fail where there is secret-dependent execution time during
          signature generation.
        </p>
        <h2>Attested Boot - TCG 1.1-Style Attestation</h2>
        <p>
          Attested boot works in a chain-like fashion by having a static root of
          trust measure a bootloader and then executes the bootloader. Then, the
          bootloader measures the OS kernel, the OS kernel runs. The OS kernel
          measures the apps and then runs them, and so forth.{" "}
          <b>Only measured content can be executed</b>. Attested boot defines
          Integrity Measurement Architecture, represented as,
          <img
            src="/img/IMA.png"
            alt=""
            style={{
              width: "60%",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
          />
          The verifier checks that all the hashes are in its database of trusted
          application hashes, and makes sure the PCR contains the correct value
          corresponding to the list of these hash values.
        </p>
        <p>
          {" "}
          <b> Shortcomings of Attested Boot </b>{" "}
        </p>
        <ul>
          <li>
            Programs only measured at launch time, not run time \(\rightarrow\)
            cannot detect dynamic attacks (e.g. memory reset attack)
          </li>
          <li>
            TCB includes the entire system since there is no isolation between
            programs
          </li>
          <li>There is no guarantee of execution</li>
        </ul>
        <h2>Lecture 10: Dynamic Root of Trust - TCG 1.2-Style Attestation</h2>
        <p>
          <span className="first-letter">T</span>o achieve runtime assurance
          isolated execution environments (IEE) need to be created. We look at the
          following questions:
        </p>
        <ul>
          <li>How to create IEE</li>
          <li>How to remotely verify/attest IEE</li>
          <li>How to establish a secure channel into IEE</li>
          <li>
            How to externally verify that output O is from S's computation on
            input I within IEE
          </li>
        </ul>
        <p>
          To create the IEE, a special atomic instruction (SKINIT on AMD and
          SENTER on Intel) is issued which does the following: resets the CPU
          state, resets dynamic PCRs, enables DMA protection for entire secure
          loader block (SLB), sends SLB contents to TPM, begins execution at SLB's
          entry point.
        </p>
        <p>
          To remotely verify or attest the IEE, a verifier sends a nonce to the
          TPM. The TPM receives the nonce and sends back a signed packet
          consisting of the hash of the SLB and the nonce. But how can the
          verifier know that the signing was genuinely done by the TPM and not the
          OS? The answer is that the public signing key of the TPM is signed by
          the TPM's manufacturer (IBM for example).
        </p>
        <p>
          To establish a secure channel, the same procedure as remote verification
          is done except this time the TPM generates a kay pair and sends the
          public key inside the signed packet that contains the nonce and SLB
          hash. The verifier then encrypts a secret symmetric key and sends this
          encrypted packet back to the TPM.
        </p>
        <p>
          To externally verify that output O is from S's computation on input I
          within IEE, the TPM provides a hash of the input and of the output and
          sends back the signed packet to the verifier.
        </p>
        <p>
          Late launch, or DRTM, thus provides verifiable untampered code
          execution. The advantage of this approach is that it is no longer
          necessary to trust the OS. Only the application in question and the
          hardware need to be trusted. The drawbacks however is that memory is not
          encrypted (local physical attack vulnerable), no threads are allowed to
          execute except the thread that called SENTER/SKINIT, and there is no
          virtualization possible since otherwise a hypervisor (which manages the
          OS) would be able to see and control the operations done by the isolated
          execution environment.
        </p>
        <h2>The Flicker System</h2>
        <p>
          The Flicker System is an implementation of a DRTM where the TCB is the
          hardware and a security-sensitive piece of code called S and a small
          piece of code called Shim.
        </p>
        <ol>
          <li>The app, which wants to execute S, invokes a module in the OS</li>
          <li>
            The module then saves the execution state of the whole system and then
            calls the SKINIT operation so the OS stops running
          </li>
          <li>
            The CPU then resets the dynamic PCRs in the TPM and starts executing
            the Shim which sets up an execution environment for S
          </li>
          <li>
            When S is done computing, the Shim recreates the execution state of
            the entire system, passes control back to the OS, and returns the
            result computed by S to the app
          </li>
        </ol>
        <p />
        <p>
          <b>
            A local application can not obtain any assurance for a locally
            executed piece of code.
          </b>{" "}
          Why? Since in the case of a malicious OS, the OS can analyze the code of
          the local verifier and simply move the instruction pointer to the point
          in the code of the local verifier that shows success.
        </p>
        <p>
          For the case of external verifier however, the verification is:
          <img
            src="/img/flicker.png"
            alt=""
            style={{
              width: "60%",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
          />
          where the blue flicker layer is the Shim layer.
        </p>
        <p>
          Malware cannot simulate SKINIT/SENTER instructions by extending
          desirable H(code) into a dynamic PCR because dynamic PCRs have an
          initial value of -1, that can only be set to 0 via SKINIT/SENTER.
        </p>
        <p>
          We now take a look at secure channel establishment protocols. First
          (flawed) protocol:
          <img
            src="/img/p1.png"
            alt=""
            style={{
              width: "59%",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
          />
          LP is the local party and RH is the remote host where untrusted App and
          OS is running. Even though not explicit, PCR17 gets extended with the
          hash of the IEE before IEE starts executing. Quoting is the attestation
          process. The flaw is that the untrusted App already has the private key
          of the IEE. The corrected protocol is <br />{" "}
          <span
            style={{ color: "blue", paddingLeft: "35%", fontSize: "smaller" }}
          >
            {" "}
            RH generates RSA key
          </span>
          <img
            src="/img/p2.png"
            alt=""
            style={{
              width: "60%",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
          />
          <br />
          The next protocol is flawed:
          <img
            src="/img/p3.png"
            alt=""
            style={{
              width: "60%",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
          />
          The flaw is that there is no guarantee that the IEE actually generated K
          and not the OS. The fix is to extend IEE's secret key into PCR18 so if
          the OS chooses its own K the verifier will get a different PCR18:
          <br />{" "}
          <span
            style={{ color: "blue", paddingLeft: "35%", fontSize: "smaller" }}
          >
            {" "}
            LP generates RSA key
          </span>
          <img
            src="/img/p4.png"
            alt=""
            style={{
              width: "60%",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
          />
          The final protocol is based on Diffie-Hellman. The flawed variant is
          given first:
          <img
            src="/img/p5.png"
            alt=""
            style={{
              width: "60%",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
          />
          The problem is that there is a circular dependency on the key K. We need
          K to unseal but we also need to unseal K. The corrected protocol is
          <br />{" "}
          <span
            style={{ color: "blue", paddingLeft: "35%", fontSize: "smaller" }}
          >
            {" "}
            Diffie-Hellman{" "}
          </span>
          <img
            src="/img/p6.png"
            alt=""
            style={{
              width: "60%",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
          />
        </p>
        <p>
          The problem with attestations is that <i>a</i> TPM vouches for a
          software state, but not <i>which</i> TPM. Thus, if an adversary controls
          the TPM of the remote host then the adversary can let the remote host
          perform the attestation, unsign using RH's public signing key, and then
          sign it using a different TPM's private signing key. The local host only
          knows that the remote host is using a certified TPM but not which TPM
          exactly.
          <br />{" "}
          <span
            style={{ color: "blue", paddingLeft: "35%", fontSize: "smaller" }}
          >
            {" "}
            The Cuckoo Attack
          </span>
          <img
            src="/img/cuckoo.png"
            alt=""
            style={{
              width: "60%",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
          />{" "}
          <br />
          The are two solutions for this. First is to physically imprint a QR code
          encoding the hash of the public key of the TPM inside the device (known
          as seeing-is-believing), and the other solution is to reboot and trust
          BIOS to output public key via existing interface. However, this last
          approach is not secure since malware can spoof the reboot process and
          output its own corrupted TPM public key.
        </p>
        <h2>Lecture 11: IoT Security</h2>
        <p>
          <span className="first-letter">A</span>n example of a naive IoT protocol
          is that implemented by the ZigBee Light Link, where a network switch
          enrypts a network key using a master ZLL key and sends the encrypted key
          to the light bulb for further communication using the encryption network
          key. For example, the switch can then send \( E_{"{"}network\ key{"}"}
          [On\ command] \) to switch on the bulb. The problem is that anyone can
          desolder the processor of the bulb and extract the master key shared by
          all light bulbs. The attacker who has this key can then change the
          network key, force a light bulb to blink for 18 hours, or factory reset.
          The attacker need not be in proximity of the victim bulb to perform this
          attack since an antenna suffices to attain the desired signal strength.
        </p>
        <p>
          ZigBee enables over-the-air updates which should be verified using
          asymmetric crypto, thereby having a different public key for each bulb.
          However, it was noticed that when the bulbs sent a request for updates
          from Philips servers, the servers responded with the same message
          (called firmware1.img on the slides) for the same update version of
          course. Thus, the servers signed the message with same symmetric key
          that was assigned to all bulbs. Asymmetric cyptography was clearly not
          used.
        </p>
        <p>
          Since the public signing and encryption key is symmetric we can extract
          it by applying differential power analysis on the bulb's SoC which
          allows uncovering the key and hence sending any update to the bulbs.
          Further, using a bug in the Atmel ZLL stack, we can circumvent proximity
          checks and make the bulb join a non ZLL network as ZLL spec mandates
          compatibility with non ZLL networks.
        </p>
        <p>
          IoT devices are prone to worms since they are vulnerable, have a radio,
          and can be infected via radio commands. Thus, IoT devices can infect
          other devices. To find how many devices are needed to infect all devices
          in a range is given by <b>percolation theory</b>. Assuming all the
          devices are uniformly randomly distributed in an area <i>A</i> and that
          the radius of operation of each device is <i>R</i> then the number of
          devices needed to spread to almost all other devices is: \[ N = 1.128
          \frac{"{"}A{"}"}
          {"{"}\pi R^2{"}"}\] Possible attacks include hardware bricking
          (physically destroying the hardware), 2.4 GHz jamming (other devices can
          no longer communicate in this frequency band), and triggering epileptic
          seizures.
        </p>
        <p>
          <b>Myth</b>: short range communication means no adversary can eavesdrop
          the communication if she is not nearby. With the appropriate antenna and
          amplifier, wireless signals can be eavesdropped or injected from large
          distances (more than a kilometer).
        </p>
        <p>
          The IETF has tried to standardize IoT by creating a potential IoT
          protocol stack that is <b>interoperable</b> (unified for all devices)
          and <b>lightweight</b>:{" "}
          <img
            src="/img/iotlayers.png"
            alt=""
            style={{
              width: "50%",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
          />
          <br /> In reality however, IoT devices such as Bluetooth, ZigBee, WiFi,
          LoRa, all have different IoT stacks. Many IoT devices such as ZigBee use
          a <b>sort of</b> standardized stack such as <br />{" "}
          <img
            src="/img/iotlay.png"
            alt=""
            style={{
              width: "30%",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
          />
          <br />
          where green indicates that a feature has security options. As many small
          devices are low power, it is uncertain whether they will ever be able to
          use the full IP protocol stack, hence the need for these IoT stacks.
        </p>
        <p>
          Encryption is not enough since for ZigBee, BLE, and WiFi the MAC address
          is in cleartext and events (such as switching on a IoT device) are
          marked by sharp rise in bitrate (B/s). For example, an attacker can
          infer a user's home activity from encrypted traffic by monitoring device
          MAC addresses as well as traffic volume: <br />
          <img
            src="/img/events.png"
            alt=""
            style={{
              width: "50%",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
          />{" "}
          <br />
          This attack involves machine learning to derive the device state, and
          thus derive the user behavior.
        </p>
        <p>
          This type of attack is caused by an <strong>existential leakage</strong>{" "}
          based on the time of transmission of a <b>single message</b>, as opposed
          to <strong>statistical leakage</strong> which is based on{" "}
          <b>changes in the sending rate over an interval.</b> The former can not
          be fully eliminated as it requires sending dummy messages at the
          application's time resolution (not possible with battery-powered
          device), whereas the latter can be eliminated by discretizing time into
          intervals and maintaining roughly the same rate in each interval.
          Unfortunately, hiding transmission times alone does not secure
          information.
        </p>
        <p>
          In VoIP (voice over IP), sound signals are compressed using{" "}
          <span style={{ color: "blue" }}> variable-bit-rate</span> codecs and
          compressed using{" "}
          <span style={{ color: "blue" }}>length-preserving</span> stream ciphers.
          As such, the length of the encrypted packet leaks information about the
          phonemes. An illustration of the process is shown{" "}
          <img
            src="/img/voip.png"
            alt=""
            style={{
              width: "50%",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
          />{" "}
          note that phoneme segmenation is achieved by ML at 94% precision
          (tp/(tp+fp)) and phoneme classification is at 45% accuracy. Recovered
          sentences are then METEOR-scored.
        </p>
        <p>
          Another data leakage despite encryption is auto-suggest which leaks
          character pressed, based on the size of the returned matches. To
          mitigate this, a website must make sure all auto-suggest packets are of
          the same length and that there is no detectable timing difference for
          characters that return long number of matches versus short number of
          matches. GIFs, which use run-length compression, are prone to side
          channels. For example, an investment website which displays the
          percentage of investment funds by value on a pie chart GIF leaks
          information about the percentages of the funds since the angles are
          leaked. Changes in angle are mapped to changes in stock prices, and the
          exact companies being invested in are thus found. Run-length compression
          is done on a line-by-line basis.
          <img
            src="/img/pie.png"
            alt=""
            style={{
              width: "65%",
              height: "auto",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
          />
        </p>
        <p>
          Note that these timing-and-packet-length attacks are realizable even if
          the victim is using a VPN, unless the VPN happens to regularize the flow
          rate of packets as well as unify their size.
        </p>
        <p>
          <strong>Case study: Device Pairing</strong> <br />
          Pairing: the process of establishing a{" "}
          <span style={{ color: "green" }}>security association</span> between two
          devices that{" "}
          <span style={{ color: "red" }}>share no prior knowledge</span>. Secure
          device pairing requires the pairing process to be resilient against a
          MITM attack. There are two types of secure pairing: the first relies on
          a secondary channel called OOB (out of band) channel, and the other does
          not use OOB. The OOB channel has limited bandwidth capacity as it is
          used for authentication purposes only (for example, public key
          transmitted on in-band channel and hash of it trans. on OOB). The OOB,
          unlike the in-band channel, is assumed to guarantee authenticity against
          MITM.
          <br /> Two types of OOB channels
        </p>
        <ul>
          <li>
            <b>Human perceivable:</b> Visible Light Communication, visual,
            infrared Data Association, audio, haptic, and sensing
          </li>
          <li>
            <b>Physically-constrained:</b> WiFi, Bluetooth (both not recommended
            due to amplification of signal with antennas and amplifiers),
            near-field communication (NFC), ultrasound
          </li>
        </ul>
        <p>
          An example of haptic physically-constrained OOB channel is placing two
          phones in one's hand and shaking them. The accelerometer of the two
          phones show the same readings and these readings are used to make a
          shared DH key.
        </p>
        <p className="subtopic">Bluetooth Low Energy (Human Perceivable)</p>
        <p>BLE supports four modes</p>
        <ul>
          <li>
            Just Works: provides no authentication (old version not secure against
            passive, new version secure only against passive)
          </li>
          <li>
            Passkey entry mode: a 6-digit PIN is displayed on one device, and the
            user inputs the PIN to the other
          </li>
          <li>
            Numeric comparison mode: both devices display a 6-digit PIN, and the
            user checks that both match
          </li>
          <li>
            Out-of-band: is directly provided with a shared key and assumes the
            key has been securely established via an alternative OOB channel
          </li>
        </ul>
        <p />
      </main>
    </div>
  </>
  
  

}

export default Article;