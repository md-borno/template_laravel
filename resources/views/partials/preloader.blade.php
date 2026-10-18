{{-- CODLEXA Fast Layered Intro Preloader --}}
<style>
    /* Prevent scrolling while preloader is active */
    html.codlexa-preloader-active,
    html.codlexa-preloader-active body {
        overflow: hidden !important;
        height: 100vh !important;
    }

    /* Immediate suppression if intro was already seen this session */
    html.codlexa-intro-seen #codlexa-preloader {
        display: none !important;
    }

    #codlexa-preloader {
        position: fixed;
        inset: 0;
        z-index: 99999999;
        background-color: #0F172A;
        color: #ffffff;
        user-select: none;
        -webkit-user-select: none;
        overflow: hidden;
        cursor: default;
        will-change: transform, border-radius;
        transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1),
                    border-radius 0.5s cubic-bezier(0.76, 0, 0.24, 1);
    }

    /* Fixed Header Overlay */
    .codlexa-fixed-header {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 200;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.5rem 2rem;
        pointer-events: none;
    }

    .codlexa-brand-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-family: 'Instrument Sans', system-ui, sans-serif;
        font-size: 13px;
        font-weight: 800;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: #f4f4f5;
    }

    .codlexa-badge-dot {
        width: 7px;
        height: 7px;
        border-radius: 9999px;
        background-color: #00D0F4;
        box-shadow: 0 0 10px #00D0F4;
        animation: codlexaDotPulse 1s ease-in-out infinite;
    }

    @keyframes codlexaDotPulse {
        0%, 100% { opacity: 0.4; transform: scale(0.85); }
        50% { opacity: 1; transform: scale(1.25); }
    }

    .codlexa-system-status {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        font-size: 11px;
        letter-spacing: 0.25em;
        text-transform: uppercase;
        color: #71717a;
    }

    /* Fixed Footer Overlay */
    .codlexa-fixed-footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 200;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        padding: 1.75rem 1.5rem;
        pointer-events: none;
    }

    .codlexa-tracker {
        display: flex;
        align-items: center;
        gap: clamp(0.75rem, 2.5vw, 1.75rem);
        font-family: 'Instrument Sans', system-ui, sans-serif;
        font-weight: 800;
        font-size: clamp(14px, 2vw, 17px);
        letter-spacing: 0.15em;
    }

    .codlexa-track-char {
        color: rgba(255, 255, 255, 0.2);
        transition: color 0.12s ease, text-shadow 0.12s ease, transform 0.12s ease;
    }

    .codlexa-track-char.active {
        color: #00D0F4;
        transform: translateY(-2px) scale(1.2);
        text-shadow: 0 0 14px rgba(0, 208, 244, 0.95);
    }

    .codlexa-track-char.passed {
        color: #ffffff;
        text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
    }

    .codlexa-tracker-line {
        width: clamp(160px, 30vw, 240px);
        height: 2px;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 9999px;
        overflow: hidden;
    }

    .codlexa-tracker-fill {
        height: 100%;
        width: 14%;
        background: linear-gradient(90deg, #004DEB, #00D0F4);
        border-radius: 9999px;
        box-shadow: 0 0 8px rgba(0, 208, 244, 0.85);
        transition: width 0.12s ease-out;
    }

    /* Layers Stage */
    .codlexa-layers-stage {
        position: absolute;
        inset: 0;
        overflow: hidden;
    }

    /* Individual Full-screen Layers */
    .codlexa-layer {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #0F172A;
        border-top: 2px solid rgba(0, 208, 244, 0.85);
        box-shadow: 0 -15px 40px rgba(0, 77, 235, 0.3);
        overflow: hidden;
        will-change: transform;
    }

    /* Background fine grid on each layer */
    .codlexa-layer::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
        background-size: 44px 44px;
        mask-image: radial-gradient(circle at 50% 50%, black 35%, transparent 80%);
        -webkit-mask-image: radial-gradient(circle at 50% 50%, black 35%, transparent 80%);
        pointer-events: none;
    }

    /* Ambient glow orb centered on the letter */
    .codlexa-layer-ambient {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: clamp(280px, 45vw, 600px);
        height: clamp(280px, 45vw, 600px);
        background: radial-gradient(circle, rgba(0, 208, 244, 0.16) 0%, rgba(0, 77, 235, 0.04) 45%, transparent 70%);
        filter: blur(50px);
        pointer-events: none;
    }

    /* Middle Screen Giant Letter with Fast Punch Settle */
    .codlexa-giant-char {
        position: relative;
        z-index: 10;
        font-family: 'Instrument Sans', system-ui, -apple-system, sans-serif;
        font-weight: 900;
        font-size: clamp(7.5rem, 30vw, 17.5rem);
        line-height: 1;
        letter-spacing: -0.05em;
        color: #ffffff;
        text-shadow: 0 0 35px rgba(0, 208, 244, 0.6), 0 0 70px rgba(0, 77, 235, 0.25);
        user-select: none;
        animation: codlexaFastCharPop 0.16s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes codlexaFastCharPop {
        0% {
            transform: scale(1.15);
            color: #00D0F4;
            text-shadow: 0 0 50px rgba(0, 208, 244, 0.95);
        }
        100% {
            transform: scale(1);
            color: #ffffff;
            text-shadow: 0 0 35px rgba(0, 208, 244, 0.4);
        }
    }

    .codlexa-layer-index {
        position: absolute;
        bottom: 2rem;
        right: 2rem;
        font-family: ui-monospace, SFMono-Regular, monospace;
        font-size: 12px;
        letter-spacing: 0.25em;
        color: rgba(255, 255, 255, 0.25);
        font-weight: 600;
        z-index: 10;
    }

    /* Fast Layer Slide-Up Keyframes */
    @keyframes codlexaFastSlideLayer {
        0% {
            transform: translateY(100%);
        }
        100% {
            transform: translateY(0%);
        }
    }

    /* Layer 0: "C" - Already in middle screen */
    .codlexa-layer-0 {
        z-index: 10;
        border-top: none;
        transform: translateY(0%);
    }

    /* Fast sequential layer timing: 130ms intervals */
    .codlexa-layer-1 {
        z-index: 20;
        transform: translateY(100%);
        animation: codlexaFastSlideLayer 0.14s cubic-bezier(0.15, 0.9, 0.25, 1) forwards 0.13s;
    }

    .codlexa-layer-2 {
        z-index: 30;
        transform: translateY(100%);
        animation: codlexaFastSlideLayer 0.14s cubic-bezier(0.15, 0.9, 0.25, 1) forwards 0.26s;
    }

    .codlexa-layer-3 {
        z-index: 40;
        transform: translateY(100%);
        animation: codlexaFastSlideLayer 0.14s cubic-bezier(0.15, 0.9, 0.25, 1) forwards 0.39s;
    }

    .codlexa-layer-4 {
        z-index: 50;
        transform: translateY(100%);
        animation: codlexaFastSlideLayer 0.14s cubic-bezier(0.15, 0.9, 0.25, 1) forwards 0.52s;
    }

    .codlexa-layer-5 {
        z-index: 60;
        transform: translateY(100%);
        animation: codlexaFastSlideLayer 0.14s cubic-bezier(0.15, 0.9, 0.25, 1) forwards 0.65s;
    }

    .codlexa-layer-6 {
        z-index: 70;
        transform: translateY(100%);
        animation: codlexaFastSlideLayer 0.14s cubic-bezier(0.15, 0.9, 0.25, 1) forwards 0.78s;
    }

    /* Snappy Curtain Exit Animation */
    #codlexa-preloader.codlexa-curtain-up {
        transform: translateY(-100%);
        border-bottom-left-radius: 40vw 120px;
        border-bottom-right-radius: 40vw 120px;
        pointer-events: none;
    }
</style>

<div id="codlexa-preloader" aria-hidden="true" role="status">
    {{-- Fixed Header --}}
    <div class="codlexa-fixed-header">
        <div class="codlexa-brand-badge">
            <span class="codlexa-badge-dot"></span>
            <span>CODLEXA</span>
        </div>
        <div class="codlexa-system-status">
            INITIALIZING
        </div>
    </div>

    {{-- Fast Layered Stages: C in middle, then fast O, D, L, E, X, A --}}
    <div class="codlexa-layers-stage">
        {{-- Layer 0: C --}}
        <div class="codlexa-layer codlexa-layer-0">
            <div class="codlexa-layer-ambient"></div>
            <div class="codlexa-giant-char">C</div>
            <div class="codlexa-layer-index">01 / 07</div>
        </div>

        {{-- Layer 1: O --}}
        <div class="codlexa-layer codlexa-layer-1">
            <div class="codlexa-layer-ambient"></div>
            <div class="codlexa-giant-char">O</div>
            <div class="codlexa-layer-index">02 / 07</div>
        </div>

        {{-- Layer 2: D --}}
        <div class="codlexa-layer codlexa-layer-2">
            <div class="codlexa-layer-ambient"></div>
            <div class="codlexa-giant-char">D</div>
            <div class="codlexa-layer-index">03 / 07</div>
        </div>

        {{-- Layer 3: L --}}
        <div class="codlexa-layer codlexa-layer-3">
            <div class="codlexa-layer-ambient"></div>
            <div class="codlexa-giant-char">L</div>
            <div class="codlexa-layer-index">04 / 07</div>
        </div>

        {{-- Layer 4: E --}}
        <div class="codlexa-layer codlexa-layer-4">
            <div class="codlexa-layer-ambient"></div>
            <div class="codlexa-giant-char">E</div>
            <div class="codlexa-layer-index">05 / 07</div>
        </div>

        {{-- Layer 5: X --}}
        <div class="codlexa-layer codlexa-layer-5">
            <div class="codlexa-layer-ambient"></div>
            <div class="codlexa-giant-char">X</div>
            <div class="codlexa-layer-index">06 / 07</div>
        </div>

        {{-- Layer 6: A --}}
        <div class="codlexa-layer codlexa-layer-6">
            <div class="codlexa-layer-ambient"></div>
            <div class="codlexa-giant-char">A</div>
            <div class="codlexa-layer-index">07 / 07</div>
        </div>
    </div>

    {{-- Fixed Footer with fast letter tracker --}}
    <div class="codlexa-fixed-footer">
        <div class="codlexa-tracker">
            <span class="codlexa-track-char active" data-idx="0">C</span>
            <span class="codlexa-track-char" data-idx="1">O</span>
            <span class="codlexa-track-char" data-idx="2">D</span>
            <span class="codlexa-track-char" data-idx="3">L</span>
            <span class="codlexa-track-char" data-idx="4">E</span>
            <span class="codlexa-track-char" data-idx="5">X</span>
            <span class="codlexa-track-char" data-idx="6">A</span>
        </div>
        <div class="codlexa-tracker-line">
            <div id="codlexa-tracker-fill" class="codlexa-tracker-fill"></div>
        </div>
    </div>
</div>

<script>
    (function () {
        try {
            var urlParams = new URLSearchParams(window.location.search);
            var forceIntro = urlParams.has('intro') || urlParams.has('loader');
            var introKey = 'codlexa_intro_viewed_v1';
            var hasVisited = false;

            try {
                hasVisited = sessionStorage.getItem(introKey) === 'true' || localStorage.getItem(introKey) === 'true';
            } catch (storageErr) {
                hasVisited = false;
            }

            var preloader = document.getElementById('codlexa-preloader');
            if (!preloader) return;

            // If user has already visited and didn't force ?intro, dismiss immediately
            if (hasVisited && !forceIntro) {
                document.documentElement.classList.add('codlexa-intro-seen');
                preloader.remove();
                return;
            }

            // First time entering website! Lock page scrolling
            document.documentElement.classList.add('codlexa-preloader-active');

            var trackerChars = document.querySelectorAll('.codlexa-track-char');
            var trackerFill = document.getElementById('codlexa-tracker-fill');

            // Fast sequential timings (130ms per letter)
            var stepTimings = [
                { idx: 0, time: 0 },
                { idx: 1, time: 130 },
                { idx: 2, time: 260 },
                { idx: 3, time: 390 },
                { idx: 4, time: 520 },
                { idx: 5, time: 650 },
                { idx: 6, time: 780 }
            ];

            stepTimings.forEach(function (step) {
                setTimeout(function () {
                    for (var i = 0; i < trackerChars.length; i++) {
                        if (i < step.idx) {
                            trackerChars[i].className = 'codlexa-track-char passed';
                        } else if (i === step.idx) {
                            trackerChars[i].className = 'codlexa-track-char active';
                        } else {
                            trackerChars[i].className = 'codlexa-track-char';
                        }
                    }
                    if (trackerFill) {
                        var percent = Math.round(((step.idx + 1) / 7) * 100);
                        trackerFill.style.width = percent + '%';
                    }
                }, step.time);
            });

            // Fast transition to page after A finishes (~940ms total)
            setTimeout(function () {
                // All letters lit up
                trackerChars.forEach(function (char) {
                    char.className = 'codlexa-track-char active';
                });

                // Smooth curtain exit
                setTimeout(revealPage, 160);
            }, 940);

            function revealPage() {
                try {
                    sessionStorage.setItem(introKey, 'true');
                    localStorage.setItem(introKey, 'true');
                } catch (e) {}

                if (preloader) {
                    preloader.classList.add('codlexa-curtain-up');

                    // Unlock scrolling
                    document.documentElement.classList.remove('codlexa-preloader-active');
                    document.documentElement.classList.add('codlexa-intro-seen');

                    // Remove from DOM after slide-up completes (500ms)
                    setTimeout(function () {
                        if (preloader && preloader.parentNode) {
                            preloader.parentNode.removeChild(preloader);
                        }
                    }, 520);
                }
            }

            // Global test helper
            window.replayCodlexaIntro = function () {
                try {
                    sessionStorage.removeItem(introKey);
                    localStorage.removeItem(introKey);
                } catch (e) {}
                window.location.reload();
            };

        } catch (err) {
            console.error('Preloader error:', err);
            var el = document.getElementById('codlexa-preloader');
            if (el) el.remove();
            document.documentElement.classList.remove('codlexa-preloader-active');
        }
    })();
</script>
