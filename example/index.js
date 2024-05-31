import * as React from "react";
import { createRoot } from "react-dom/client";
import Limuse from "../src/index.tsx";
import * as LimuseComponent from "../src/components/index.ts";


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const data = [
  { id: "filetop", description: "Monitor file system events in real-time. Uses Linux eBPF/bcc." },
  { id: "tcpconnect", description: "Trace TCP connect() syscalls. Uses Linux eBPF/bcc." },
  { id: "opensnoop", description: "Trace open() syscalls. Uses Linux eBPF/bcc." },
  { id: "networkstats", description: "Collect network statistics. Uses Linux eBPF/bcc." },
  { id: "memleak", description: "Detect memory leaks. Uses Linux eBPF/bcc." },
  { id: "cpuprofile", description: "Profile CPU usage. Uses Linux eBPF/bcc." },
  { id: "diskio", description: "Trace disk I/O events. Uses Linux eBPF/bcc." },
  { id: "syscalltrace", description: "Trace system calls. Uses Linux eBPF/bcc." },
  { id: "memusage", description: "Monitor memory usage. Uses Linux eBPF/bcc." },
  { id: "networkmonitor", description: "Monitor network traffic. Uses Linux eBPF/bcc." }
];

const categorisedData = {
  "Network": [
    { id: "Tcpconnect", description: "Trace TCP connect() syscalls. Uses Linux eBPF/bcc." },
    { id: "networkmonitor", description: "Monitor network traffic. Uses Linux eBPF/bcc." }
  ],
  "File System": [
    { id: "filetop", description: "Monitor file system events in real-time. Uses Linux eBPF/bcc." },
    { id: "opensnoop", description: "Trace open() syscalls. Uses Linux eBPF/bcc." }
  ],
  "Memory": [
    { id: "memleak", description: "Detect memory leaks. Uses Linux eBPF/bcc." },
    { id: "memusage", description: "Monitor memory usage. Uses Linux eBPF/bcc." }
  ],
  "CPU": [
    { id: "cpuprofile", description: "Profile CPU usage. Uses Linux eBPF/bcc." }
  ],
  "Disk I/O": [
    { id: "diskio", description: "Trace disk I/O events. Uses Linux eBPF/bcc." }
  ],
  "Security": [
    { id: "audit", description: "Audit system events. Uses Linux eBPF/bcc." },
    { id: "firewall", description: "Monitor firewall rules. Uses Linux eBPF/bcc." }
  ],
  "Performance": [
    { id: "perf", description: "Monitor system performance. Uses Linux eBPF/bcc." },
    { id: "latency", description: "Measure network latency. Uses Linux eBPF/bcc." }
  ],
  "Process": [
    { id: "ps", description: "Monitor running processes. Uses Linux eBPF/bcc." },
    { id: "top", description: "Monitor system resource usage. Uses Linux eBPF/bcc." }
  ],
  "Storage": [
    { id: "iostat", description: "Monitor disk I/O statistics. Uses Linux eBPF/bcc." },
    { id: "df", description: "Monitor disk space usage. Uses Linux eBPF/bcc." }
  ],
  "Virtualization": [
    { id: "kvm", description: "Monitor KVM virtualization. Uses Linux eBPF/bcc." },
    { id: "docker", description: "Monitor Docker containers. Uses Linux eBPF/bcc." }
  ]
};


root.render(
  <div>
    <div className="flex flex-col items-center h-96 pt-4 lg:mx-auto lg:w-6/12 sm:mx-3">
      <Limuse data={data} minPatternLength={1} removeOnRowClick={false}>
        <LimuseComponent.Table>
          <LimuseComponent.TableHeader>
            <LimuseComponent.HeaderCell align="left" title="Command"/>
            <LimuseComponent.HeaderCell align="left" title="Description"/>
          </LimuseComponent.TableHeader>
          <LimuseComponent.TableBody>
            <LimuseComponent.BodyRow>
              <LimuseComponent.RowCell align="left" dataAssign="id" />
              <LimuseComponent.RowCell align="left" dataAssign="description" />
            </LimuseComponent.BodyRow>
          </LimuseComponent.TableBody>
        </LimuseComponent.Table>
      </Limuse>
    </div>

    <div className="flex flex-col items-center h-96 pt-4 lg:mx-auto lg:w-6/12 sm:mx-3">
      <Limuse data={categorisedData} minPatternLength={1} removeOnRowClick={false}>
        <LimuseComponent.Table>
          <LimuseComponent.TableHeader>
            <LimuseComponent.HeaderCell align="left" title="Command"/>
            <LimuseComponent.HeaderCell align="left" title="Description"/>
          </LimuseComponent.TableHeader>
          <LimuseComponent.TableBody>
            <LimuseComponent.BodyRow>
              <LimuseComponent.RowCell align="left" dataAssign="id" />
              <LimuseComponent.RowCell align="left" dataAssign="description" />
            </LimuseComponent.BodyRow>
          </LimuseComponent.TableBody>
        </LimuseComponent.Table>
      </Limuse>
    </div>
  </div>
);