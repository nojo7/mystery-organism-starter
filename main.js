// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Factory function to create Pila aequor
const pAequorFactory = (speciNum, dna) => {
  return {
    _speciNum: speciNum,
    _dna: dna,
    // Mutates DNA of the species
    mutate() {
      const randIndex = Math.floor(Math.random() * this._dna.length);
      let newBase = '';
      do {
        newBase = returnRandBase();
      } while (returnRandBase() === newBase);
      this._dna[randIndex] = newBase;
      return this._dna;
    },
    // Identifies the DNA similarity of two species as a percent
    compareDNA(pAequor) {
      let similarDna = 0;
      let calcPercent = 0;
      for(const value in pAequor._dna) {
        if(pAequor._dna[value] === this._dna[value]) {
          similarDna++;
        }
      }
      calcPercent = ((similarDna / 15) * 100).toFixed(0);
      console.log(`Specimen #${this._speciNum} and Specimen #${pAequor._speciNum} have ${calcPercent}% DNA in common.`);
    },
    // Determines likelihood of survival for a specimen if they contain at least 60% of gene C or G
    willLikelySurvive() {
      let strongGenes = 0;
      let calcPercent = 0;
      for(const value in this._dna) {
        if(this._dna[value] === 'C' || this._dna[value] === 'G')
        strongGenes++;
      }
      calcPercent = ((strongGenes / 15) *100).toFixed(0);
      return calcPercent >= 60 ? true : false;
    }
  };
}


// Creates 30 Pila aequor that are most likely to survive
const species30 = () => {
  let speciesArr = [];
  let speciNum = 1;
  while(speciesArr.length < 30) {
    const dna = mockUpStrand();
    const species = pAequorFactory(speciNum, dna);
    if(species.willLikelySurvive() === true) {
      speciNum++;
      speciesArr.push(species);
    }
  }
  return speciesArr;
}

const pAequors = species30();

console.log(pAequors);