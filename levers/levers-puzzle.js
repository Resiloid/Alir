(function() {
    const widget = document.getElementById("leversWidget");
    const effects = document.getElementById("leversEffects");
    const levers = [
        // 1
        { on: false, name: "Ether-weaver",  effect: "The ether is woven into some structures" },
        { on: false, name: "?",              effect: "Something is wrong, seems like the lever #2 is broken" },
        { on: false, name: "?",              effect: "Unknown effect, but better don't turn it on when #17 is off " },
        { on: true,  name: "Flow-spreader", effect: "The flow is speading" },
        { on: true,  name: "Dehumanizer",   effect: "The ether is more human-like and split into particles", reversed: true },
        // 6
        { on: true,  name: "Duplicator", effect: "The flow is dupliacted symmetrically" },
        { on: true,  name: "?", effect: "Unknown effect, but it seems related to #6" },
        { on: true,  name: "Facility power", effect: "The facility is powered" },
        { on: true,  name: "Puppy-distractor", effect: "Anura's dog is curious about the machine if #10 is on", reversed: true },
        { on: true,  name: "Ether-gatherer", effect: "The Ether is gathering; allows to turn #11 on when #10 is turned on first" },
        // 11
        { on: true,  name: "Weave-gatherer", effect: "The Weave is gathering; can be enabled after #10, but not before it" },
        { on: true,  name: "?", effect: "Magical Radiation is going off of the machine [danger]", reversed: true },
        { on: false, name: "Artificerer", effect: "The Ether is artificer-like" },
        { on: true,  name: "Sequence-reverser", effect: "The sequence of #10 and #11 is reversed" },
        { on: false, name: "Powerizer", effect: "The power of the flow is increased" },
        // 16
        { on: false, name: "Accelerator", effect: "The speed of the flow is increased" },
        { on: true,  name: "Gate-opener", effect: "The gate is closed, so the ether is overflowing into the room", reversed: true },
        { on: false, name: "Taxator", effect: "The \"damage debt\" is taken from us each time we receive damage" },
        { on: false, name: "Splitter", effect: "The flow is split into short intervals" },
        { on: true,  name: "Machine power", effect: "The machine is on" }
    ];

    renderLevers();
    renderEffects();

    function renderLevers() {
        levers.forEach(renderLever);
    }

    function renderLever(lever, index) {
        const template = document.createElement("template");
        template.innerHTML = getLeverTemplate(lever, index + 1);
        const leverEl = template.content.firstElementChild;
        widget.appendChild(leverEl);

        leverEl.onclick = function() {
            toggleLever(lever, leverEl);
        }    
    }

    function getLeverTemplate(lever, index) {
        return `<div class="lever-wrapper ${lever.on ? 'on' : ''}">
          <span class="lever-title">${lever.name}</span>
          <span class="lever"></span>
          <span class="lever-index">${index}</span>
        </div>`;
    }

    function toggleLever(lever, el) {
        const on = !lever.on;

        lever.on = on;

        if (on) {
            el.classList.add("on");
        } else {
            el.classList.remove("on");
        }

        renderEffects();
    }

    function renderEffects() {
        effects.innerHTML = ""; // clear effects list

        levers.forEach(function(lever, i) {
            const effectEl = document.createElement("li");
            effectEl.innerText = (lever.reversed ? "[REVERSED] " : "") + lever.effect;

            if (lever.on && lever.reversed || !lever.on && !lever.reversed) effectEl.classList.add("disabled");

            effects.appendChild(effectEl);
        });
    }
})()