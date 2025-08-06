// JavaScript for Shiv Kumar Arora's DevOps portfolio website

document.addEventListener('DOMContentLoaded', () => {
  /* Typewriter effect for the hero tagline */
  const taglineEl = document.getElementById('typewriter');
  // Reset tagline content to ensure a baseline
  if (taglineEl) taglineEl.textContent = '';
  const words = [
    'I build pipelines.',
    'I automate clouds.',
    'I optimise everything.'
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 120;

  function type() {
    const current = words[wordIndex];
    if (!isDeleting) {
      taglineEl.textContent = current.substring(0, charIndex++);
      // Pause a little at end of word
      if (charIndex > current.length + 10) {
        isDeleting = true;
        typingSpeed = 40;
      } else {
        typingSpeed = 120;
      }
    } else {
      taglineEl.textContent = current.substring(0, charIndex--);
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 300;
      }
    }
    setTimeout(type, typingSpeed);
  }
  // Initiate typing after a short delay to ensure rendering
  setTimeout(type, 500);

  /* Modal handling for project case studies */
  const modalButtons = document.querySelectorAll('.project-card .btn-outline');
  modalButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const card = btn.closest('.project-card');
      const modalId = card ? card.getAttribute('data-modal') : null;
      if (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.classList.add('active');
        }
      }
    });
  });
  // Close buttons
  const closeButtons = document.querySelectorAll('.modal-close');
  closeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const overlay = btn.closest('.modal-overlay');
      overlay.classList.remove('active');
    });
  });
  // Close on clicking outside modal content
  const overlays = document.querySelectorAll('.modal-overlay');
  overlays.forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });

  /* Contact form handling */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Simulate a send by delaying a little then updating the status
      formStatus.textContent = 'Sending...';
      setTimeout(() => {
        formStatus.textContent = 'Your message has been sent!';
        contactForm.reset();
      }, 800);
    });
  }

  /* Intersection observer for timeline animation */
  const timelineItems = document.querySelectorAll('.timeline-item');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  timelineItems.forEach((item) => {
    item.classList.add('hidden');
    observer.observe(item);
  });

  /* Intersection observer for about section blocks */
  const aboutBlocks = document.querySelectorAll('.about-block');
  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          aboutObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  aboutBlocks.forEach((block) => {
    block.classList.add('hidden');
    aboutObserver.observe(block);
  });

  /* Simple interactive CLI simulation */
  const cliOutput = document.getElementById('cli-output');
  const cliInput = document.getElementById('cli-input');
  if (cliInput && cliOutput) {
    // Append a line to the console output
    function appendLine(text, isCommand = false) {
      const line = document.createElement('div');
      line.textContent = isCommand ? '> ' + text : text;
      cliOutput.appendChild(line);
      // Scroll to bottom
      cliOutput.scrollTop = cliOutput.scrollHeight;
    }
    // Handle command logic
    function processCommand(cmd) {
      const lower = cmd.toLowerCase();
      appendLine(cmd, true);
      switch (lower) {
        case 'help':
          appendLine('Available commands: help, whoami, skills, projects, uptime, deploy, clear');
          break;
        case 'whoami':
          appendLine('👤 Shiv Kumar Arora – DevOps & Cloud Engineer');
          break;
        case 'skills':
          appendLine('AWS, Terraform, ArgoCD, Docker, Helm, Prometheus/Grafana, Jenkins, GitHub Actions, RBAC, Secrets');
          break;
        case 'projects':
          appendLine('BankApp Pipeline, Multi‑Env Terraform + Ansible, Lambda Cost Optimizer');
          break;
        case 'uptime':
          appendLine('MTTR ↓ 40%, Uptime 99.99%, Cost Savings $1500+/mo');
          break;
        case 'deploy':
        case 'deploy.shiv':
          appendLine('✅ Infrastructure secured. Pipelines deployed. Monitoring online.');
          break;
        case 'clear':
          cliOutput.innerHTML = '';
          break;
        default:
          appendLine('Command not found. Type help to see available commands.');
      }
    }
    cliInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const value = cliInput.value.trim();
        if (value) {
          processCommand(value);
        }
        cliInput.value = '';
      }
    });
  }

  /* Typewriter effect for the boot sequence in the About section */
  const bootEl = document.getElementById('boot-sequence');
  if (bootEl) {
    const bootLines = [
      '> Booting ShivOS v3.0...',
      '️✔️ GitOps Pipeline Engine Loaded',
      '️✔️ Site Reliability Mode Engaged',
      '️✔️ Platform Resilience Module Active',
      '️✔️ Cloud Automation Interface Stable'
    ];
    let lineIndex = 0;
    let charIdx = 0;
    function typeBoot() {
      if (lineIndex < bootLines.length) {
        const currentLine = bootLines[lineIndex];
        if (charIdx <= currentLine.length) {
          // Replace only the current line content
          const existingLines = bootLines
            .slice(0, lineIndex)
            .map((l) => l)
            .join('\n');
          bootEl.textContent = existingLines + (existingLines ? '\n' : '') + currentLine.substring(0, charIdx++);
        } else {
          lineIndex++;
          charIdx = 0;
        }
        setTimeout(typeBoot, 60);
      }
    }
    // Clear initial content and start typing
    bootEl.textContent = '';
    typeBoot();
  }

  /* Metrics counter animation */
  const metricEls = document.querySelectorAll('.metric-value');
  let metricsAnimated = false;
  function animateMetrics() {
    if (metricsAnimated) return;
    metricEls.forEach((el) => {
      const target = parseFloat(el.getAttribute('data-target'));
      const prefix = el.getAttribute('data-prefix') || '';
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 2000; // 2 seconds
      const startTime = performance.now();
      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        let currentValue;
        // If target is decimal (contains decimal part), use one decimal precision
        if (String(target).includes('.')) {
          currentValue = (target * progress).toFixed(2);
        } else {
          currentValue = Math.floor(target * progress);
        }
        // Compose value with prefix/suffix
        el.textContent = `${prefix}${currentValue}${suffix}`;
        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }
      requestAnimationFrame(update);
    });
    metricsAnimated = true;
  }
  // Intersection observer for metrics
  const metricsSection = document.querySelector('.metrics-section');
  if (metricsSection) {
    const metricsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateMetrics();
            metricsObserver.unobserve(metricsSection);
          }
        });
      },
      { threshold: 0.3 }
    );
    metricsObserver.observe(metricsSection);
  }

  /* Pipeline flow animation */
  const pipelineSteps = document.querySelectorAll('.pipeline-step');
  let pipelineInterval;
  function startPipelineAnimation() {
    if (pipelineInterval || pipelineSteps.length === 0) return;
    let index = 0;
    pipelineInterval = setInterval(() => {
      // Remove active class from all steps
      pipelineSteps.forEach((step) => step.classList.remove('active'));
      // Set current active
      const step = pipelineSteps[index];
      if (step) {
        step.classList.add('active');
      }
      index = (index + 1) % pipelineSteps.length;
    }, 1000);
  }
  function stopPipelineAnimation() {
    if (pipelineInterval) {
      clearInterval(pipelineInterval);
      pipelineInterval = null;
      pipelineSteps.forEach((step) => step.classList.remove('active'));
    }
  }
  const pipelineSection = document.querySelector('.pipeline-section');
  if (pipelineSection) {
    const pipelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startPipelineAnimation();
          } else {
            stopPipelineAnimation();
          }
        });
      },
      { threshold: 0.3 }
    );
    pipelineObserver.observe(pipelineSection);
  }

  /* Theme toggle */
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    // Set initial theme from local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'alt') {
      document.body.classList.add('theme-alt');
    }
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('theme-alt');
      const isAlt = document.body.classList.contains('theme-alt');
      localStorage.setItem('theme', isAlt ? 'alt' : 'default');
    });
  }

  /* Kubernetes self‑healing simulation on Labs page */
  const podGrid = document.getElementById('pod-grid');
  const killPodBtn = document.getElementById('kill-pod-btn');
  const clusterStatus = document.getElementById('cluster-status');
  if (podGrid && killPodBtn && clusterStatus) {
    const initialPodCount = 5;
    // Render initial pods
    function renderPods() {
      podGrid.innerHTML = '';
      for (let i = 0; i < initialPodCount; i++) {
        const pod = document.createElement('div');
        pod.classList.add('pod', 'running');
        pod.textContent = '🟢';
        podGrid.appendChild(pod);
      }
    }
    renderPods();
    killPodBtn.addEventListener('click', () => {
      const runningPods = podGrid.querySelectorAll('.pod.running');
      if (runningPods.length === 0) {
        clusterStatus.textContent = 'All pods are already restarting...';
        return;
      }
      // Kill the first running pod
      const pod = runningPods[0];
      pod.classList.remove('running');
      pod.classList.add('terminated');
      pod.textContent = '💀';
      clusterStatus.textContent = 'Pod terminated. Restarting...';
      // After delay, bring it back to running state
      setTimeout(() => {
        pod.classList.remove('terminated');
        pod.classList.add('running');
        pod.textContent = '🟢';
        clusterStatus.textContent = 'All pods are running.';
      }, 2000);
    });
  }

  /* Topology diagram hover info on Labs page */
  const topologyInfo = document.getElementById('topology-info');
  const topologyNodes = document.querySelectorAll('.topology-node');
  if (topologyInfo && topologyNodes.length > 0) {
    topologyNodes.forEach((node) => {
      node.addEventListener('mouseenter', () => {
        const name = node.getAttribute('data-name') || '';
        const info = node.getAttribute('data-info') || '';
        // Replace literal \n with separator
        const formatted = info.replace(/\\n/g, ' | ');
        topologyInfo.textContent = `${name}: ${formatted}`;
      });
      node.addEventListener('mouseleave', () => {
        topologyInfo.textContent = 'Hover over a node to see details.';
      });
    });
  }

  /* Live log stream simulation */
  const logOutput = document.getElementById('log-output');
  const logToggleBtn = document.getElementById('log-toggle');
  let logInterval;
  let logsPaused = false;
  // Predefined log templates for diversity
  const logTemplates = [
    { type: 'info', message: 'Pulling latest changes from repository...' },
    { type: 'success', message: 'Build completed successfully.' },
    { type: 'warn', message: 'Service response time exceeded threshold.' },
    { type: 'error', message: 'Deployment failed due to misconfiguration.' },
    { type: 'info', message: 'Running automated tests...' },
    { type: 'success', message: 'Tests passed: 154, failed: 0.' },
    { type: 'info', message: 'Pushing image to registry...' },
    { type: 'success', message: 'Image tagged and pushed to ECR.' },
    { type: 'warn', message: 'High memory usage detected on node-2.' },
    { type: 'info', message: 'Triggering ArgoCD sync...' },
    { type: 'success', message: 'ArgoCD sync complete. Revision: a1b2c3d.' },
    { type: 'error', message: 'Failed health check on service payment-api.' },
    { type: 'info', message: 'Restarting faulty pod...' },
    { type: 'success', message: 'Pod restarted successfully.' }
  ];
  function appendLogLine() {
    if (!logOutput || logsPaused) return;
    const entry = logTemplates[Math.floor(Math.random() * logTemplates.length)];
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').split('.')[0];
    const lineEl = document.createElement('div');
    lineEl.classList.add('log-line', entry.type);
    lineEl.textContent = `[${timestamp}] ${entry.type.toUpperCase()}: ${entry.message}`;
    logOutput.appendChild(lineEl);
    // Scroll to bottom
    logOutput.scrollTop = logOutput.scrollHeight;
    // Limit log lines to avoid memory leak
    if (logOutput.children.length > 100) {
      logOutput.removeChild(logOutput.firstChild);
    }
  }
  function startLogging() {
    if (logInterval) return;
    logInterval = setInterval(appendLogLine, 1500);
  }
  function stopLogging() {
    if (logInterval) {
      clearInterval(logInterval);
      logInterval = null;
    }
  }
  if (logToggleBtn) {
    logToggleBtn.addEventListener('click', () => {
      logsPaused = !logsPaused;
      if (logsPaused) {
        logToggleBtn.textContent = 'Resume Logs';
      } else {
        logToggleBtn.textContent = 'Pause Logs';
      }
    });
  }
  // Intersection observer for logs section
  const logsSection = document.querySelector('.logs-section');
  if (logsSection) {
    const logsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startLogging();
          } else {
            stopLogging();
          }
        });
      },
      { threshold: 0.3 }
    );
    logsObserver.observe(logsSection);
  }

  /* Incident Response Mini-Game logic */
  const incidentDesc = document.getElementById('incident-desc');
  const incidentOptionsContainer = document.getElementById('incident-options');
  const incidentFeedback = document.getElementById('incident-feedback');
  if (incidentDesc && incidentOptionsContainer && incidentFeedback) {
    const scenarios = [
      {
        desc: 'Alert: CPU usage is spiking on node‑1. What will you do?',
        choices: [
          {
            text: 'Scale up cluster',
            feedback: 'Great! Scaling up alleviated the CPU pressure.',
            next: 1
          },
          {
            text: 'Check logs',
            feedback: 'The logs reveal a memory leak causing CPU thrash.',
            next: 2
          },
          {
            text: 'Restart pod',
            feedback: 'Restarting the pod resets memory, but the underlying issue persists.',
            next: 3
          }
        ]
      },
      {
        desc: 'New alert: Response time is high in your service. What will you do?',
        choices: [
          {
            text: 'Enable autoscaling',
            feedback: 'Autoscaling balanced load and improved response time. Incident resolved!',
            end: true
          },
          {
            text: 'Run performance profiling',
            feedback: 'Profiling helps identify code-level bottlenecks for long-term fixes.',
            end: true
          },
          {
            text: 'Ignore alert',
            feedback: 'Ignoring alerts leads to SLA violations. Incident escalated.',
            end: true
          }
        ]
      },
      {
        desc: 'What fix will you apply to the memory leak? Choose an action.',
        choices: [
          {
            text: 'Apply memory leak patch',
            feedback: 'Good call! Patching resolves the memory leak and CPU returns to normal.',
            end: true
          },
          {
            text: 'Kill the service',
            feedback: 'Service downtime triggers customer dissatisfaction. Not ideal.',
            end: true
          }
        ]
      },
      {
        desc: 'The pod restarted but CPU spikes again. What next?',
        choices: [
          {
            text: 'Scale up cluster',
            feedback: 'Scaling helps temporarily, but root cause remains.',
            next: 1
          },
          {
            text: 'Investigate and patch memory leak',
            feedback: 'Finding and patching memory leak resolves issue permanently.',
            end: true
          }
        ]
      }
    ];
    let currentScenario = 0;
    function loadScenario(index) {
      const scenario = scenarios[index];
      incidentDesc.textContent = scenario.desc;
      incidentOptionsContainer.innerHTML = '';
      incidentFeedback.textContent = '';
      scenario.choices.forEach((choice) => {
        const btn = document.createElement('button');
        btn.classList.add('btn', 'btn-outline', 'incident-choice');
        btn.textContent = choice.text;
        btn.addEventListener('click', () => handleChoice(choice));
        incidentOptionsContainer.appendChild(btn);
      });
    }
    function handleChoice(choice) {
      incidentFeedback.textContent = choice.feedback;
      if (choice.end) {
        incidentOptionsContainer.innerHTML = '';
        const restartBtn = document.createElement('button');
        restartBtn.classList.add('btn', 'btn-primary');
        restartBtn.textContent = 'Restart Game';
        restartBtn.addEventListener('click', () => {
          currentScenario = 0;
          loadScenario(currentScenario);
        });
        incidentOptionsContainer.appendChild(restartBtn);
      } else if (choice.next !== undefined) {
        currentScenario = choice.next;
        setTimeout(() => {
          loadScenario(currentScenario);
        }, 1500);
      }
    }
    // Start first scenario
    loadScenario(currentScenario);
  }
});