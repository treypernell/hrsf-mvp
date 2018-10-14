
/*
  Scales are reversed to account for rendering of rows in descending order.
  This allows the sequencer to contain a 'bottom up' logic, where lower notes
  can be entered on lower rows, and higher notes on higher rows. 
*/

const scales = {
  major: ["B4", "A4", "G4", "F4", "E4", "D4", "C4"],
  minor: ["Bb4", "Ab4", "G4", "F4", "Eb4", "D4", "C4"]
}

export default scales;