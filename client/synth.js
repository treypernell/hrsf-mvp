import Tone from 'tone';

var tremolo = new Tone.Tremolo().start();
var synth = new Tone.PolySynth({
    "oscillator" : {
        "type" : "pwm",
        "modulationFrequency" : 0.8
    },
    "envelope" : {
        "attack" : 0.02,
        "decay" : 0.1,
        "sustain" : 0.2,
        "release" : 0.9,
    }
}).chain(tremolo, Tone.Master);

export default synth;