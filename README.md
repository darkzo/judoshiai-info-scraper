# judoshiai-info-scraper
Extract competitors data from JudoShiai info web viewer

# Installation
Run:
```
npm install
```

# Start script
```
node info-scraper.js
```

The script will create five files:
`tatami1.txt`
`tatami2.txt`
`tatami3.txt`
`tatami4.txt`
`tatami5.txt`

The created files will contain info about competitors of ongoing match. 
If there is no match on tatami corresponding file will be empty.

Example of single file:
```
U13M-34  
JOHN DOE - BIH/JCLUB 
JOE SMITH - SWE/JCLUB
```