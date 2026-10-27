// Products Data for Ariselux Light Towers
// Structured with official factory technical specification brochures and engineering data sheets

export const productsData = {
  // ── 1. DIESEL POWERED ──────────────────────────────────────────────
  'ace-lt-12000': {
    id: 'ace-lt-12000',
    title: 'ACE LT 12000',
    category: 'diesel',
    categoryName: 'Diesel Powered',
    tagline: 'High-Voltage 240,000 Lumens Heavy Diesel Mobile Lighting Tower',
    description: 'Ariselux Equipment Company proudly presents its advanced LED Flood Light solution - engineered for maximum brightness, energy efficiency, and durability. Powered by a genuine Japanese Escorts Kubota 14.5 HP water-cooled diesel engine operating at 1500 RPM and an automated 12.0-meter telescopic mast, delivering 240,000 lumens across 8,000 square meters.',
    image: '/images/products/Diesel oprated/ACE LT 12000 -1.png',
    gallery: [
      '/images/products/Diesel oprated/ACE LT 12000 -1.png',
      '/images/products/Diesel oprated/ACE LT 12000 -2.png',
      '/images/products/Diesel oprated/ACE LT 12000 -3.png'
    ],
    featureImage: '/images/features/features-diesel-12000.jpg',
    bestFor: [
      {
        title: 'Open-Cast Mining & Heavy Quarrying',
        desc: 'Deep open pit excavation, mineral extraction, and haul road illumination.',
        image: '/images/bestfor/diesel-mining.jpg'
      },
      {
        title: 'National Highway & Expressway Night Paving',
        desc: 'Continuous asphalt paving, road roller compaction, and worker safety.',
        image: '/images/bestfor/diesel-highway.jpg'
      },
      {
        title: 'Bridge & Heavy Civil Infrastructure Engineering',
        desc: 'Pier construction, concrete foundation pours, and crane operations.',
        image: '/images/bestfor/diesel-bridge.jpg'
      },
      {
        title: 'Mega Industrial Plants & Port Logistics',
        desc: '24/7 dry docks, freight container yards, and industrial manufacturing.',
        image: '/images/bestfor/diesel-ports.jpg'
      }
    ],
    quickSpecs: {
      mastHeight: { title: 'Mast height', value: '39 ft (12.0 MTR)', icon: '/images/icons/mast-height.svg' },
      light: { title: 'Light', value: '4 x 300W-500W LED (2,40,000 Lumens)', icon: '/images/icons/led-light.svg' },
      runtime: { title: 'Runtime', value: '80+ Hours (100L Escorts Kubota Diesel)', icon: '/images/icons/runtime-in-hours.svg' },
      coverage: { title: 'Light coverage', value: '8000 sq. m', icon: '/images/icons/light-coverage.svg' }
    },
    tableSpecs: [
      {
        engine: 'Escorts Kubota 14.5 HP (1500 R.P.M) Water-Cooled Diesel',
        generator: '220 Volts Connection Board Output Board',
        tankSize: '100 Liters (Diesel Tank Capacity)',
        sockets: 'Industrial Weatherproof Sockets with MCB Protection',
        weight: '700 KG',
        dimensions: 'Travel: 2.3 x 1.4 x 2.4 m\nOperation: 2.6 x 2.4 x 12.0 m'
      }
    ],
    features: [
      'Combined luminous output of 240,000 lumens (40,000 - 60,000 lumens per light)',
      'High-voltage LED flood lights with power range 300W to 500W',
      'Illumination coverage up to 8,000 square meters',
      'Japanese Escorts Kubota 14.5 H.P 1500 R.P.M water-cooled diesel engine',
      '12.0-meter heavy-duty vertical telescopic mast (ground level to lights)',
      'Single-axle trailer chassis with 4 heavy-duty outrigger leveling jacks'
    ],
    highlights: [
      {
        title: 'Lights & Optics',
        items: [
          'High-voltage modular LED floodlights delivering 2,40,000 total lumens',
          'Heavy-duty cast aluminum IP67/IP68 luminaire housings with vibration dampers',
          'Independent 3-axis manual angle orientation for targeted perimeter coverage',
          'Optical polycarbonate lenses ensuring uniform luminous distribution'
        ]
      },
      {
        title: 'Mast & Winch',
        items: [
          '12.0-meter heavy-duty galvanized steel telescopic mast',
          'Smooth self-locking worm winch with stainless steel aircraft-grade cable',
          '355-degree mast rotation with positive locking pin at any orientation',
          'Sealed deep-groove bearing pulleys with zinc plating for long service life'
        ]
      },
      {
        title: 'Mobility & Towing',
        items: [
          'Heavy-duty trailer chassis with pneumatic all-terrain 14" tires',
          'Universal tow hitch drawbar convertible for NATO eye or ball coupler',
          'Integrated central crane lifting eye and 3-way forklift pockets',
          'Certified highway speed towing up to 80 km/h with leaf spring suspension'
        ]
      },
      {
        title: 'Stability & Safety',
        items: [
          '4 independent heavy-duty wind-down outrigger stabilizer jacks with footpads',
          'Tested and certified for stability in high winds up to 100 km/h',
          'Integrated spirit bubble levels for rapid field leveling on unpaved terrain'
        ]
      },
      {
        title: 'Power & Controls',
        items: [
          'Standard 220 Volts output connection board for auxiliary site tools',
          'Dual changeover switch enables operating lights directly from grid utility',
          'Safety shutdown sensors for low engine oil pressure and high coolant temperature'
        ]
      }
    ],
    specSheetData: {
      docRef: 'ALX-TSS-LT12000',
      title: 'ACE LT 12000',
      subtitle: 'High-Voltage 240,000 Lumens Heavy Diesel Mobile Lighting Tower',
      sections: [
        {
          category: 'Power & Engine System',
          items: [
            { name: 'Engine Make & Model', value: 'Escorts Kubota 14.5 HP Water-Cooled Diesel' },
            { name: 'Rated Speed', value: '1500 RPM' },
            { name: 'Alternator / Output', value: '220V Connection Board Output with Auxiliary Power Sockets' },
            { name: 'Fuel Tank Capacity', value: '100 Liters (Diesel)' },
            { name: 'Operating Runtime', value: '80+ Continuous Operating Hours' },
            { name: 'Starting System', value: '12V Heavy-Duty Electric Starter' }
          ]
        },
        {
          category: 'Lighting System & Optics',
          items: [
            { name: 'Floodlight Configuration', value: '4 x 300W - 500W High-Voltage LED Luminaires' },
            { name: 'Total Luminous Flux', value: '2,40,000 Lumens (40,000 to 60,000 lm per light)' },
            { name: 'Illumination Area', value: 'Up to 8,000 sq. meters' },
            { name: 'Luminaire Protection', value: 'IP67 / IP68 Cast Aluminum Heavy Housing' },
            { name: 'Beam Orientation', value: 'Independent 3-Axis Multi-Directional Manual Aiming' }
          ]
        },
        {
          category: 'Mast & Tower Assembly',
          items: [
            { name: 'Maximum Height', value: '12.0 Meters (39 ft) Ground Level to Light' },
            { name: 'Mast Material', value: 'Heavy-Duty Galvanized Steel' },
            { name: 'Elevation Mechanism', value: 'Self-Locking Worm Winch with Stainless Steel Cable' },
            { name: 'Rotation', value: '355° Rotation with Positive Locking Pin' },
            { name: 'Wind Stability', value: 'Certified Stable up to 100 km/h with Outriggers' }
          ]
        },
        {
          category: 'Chassis, Trailer & Mobility',
          items: [
            { name: 'Trailer Chassis', value: 'Heavy-Duty Single Axle with Leaf Spring Suspension' },
            { name: 'Tyres', value: '14" All-Terrain Pneumatic Wheels (Highway Towable up to 80 km/h)' },
            { name: 'Stabilizers', value: '4 Independent Wind-Down Outrigger Jacks with Footpads' },
            { name: 'Lifting Points', value: 'Integrated Central Crane Lifting Eye & Forklift Pockets' },
            { name: 'Gross Weight', value: '700 kg' },
            { name: 'Dimensions', value: 'Travel: 2.3 x 1.4 x 2.4 m | Operation: 2.6 x 2.4 x 12.0 m' }
          ]
        },
        {
          category: 'Controls & Safety Systems',
          items: [
            { name: 'Control Panel', value: 'Weatherproof Canopy Compartment with MCBs' },
            { name: 'Engine Protection', value: 'Low Oil Pressure & High Coolant Temperature Automatic Shutdown' },
            { name: 'Electrical Safety', value: 'Earth Leakage Protection & Individual MCB per Luminaire' }
          ]
        }
      ]
    },
    variants: ['ace-lt-9000', 'ace-lt-6000', 'without-genset']
  },

  'ace-lt-9000': {
    id: 'ace-lt-9000',
    title: 'ACE LT 9000',
    category: 'diesel',
    categoryName: 'Diesel Powered',
    tagline: 'High-Efficiency Air-Cooled Diesel Mobile Lighting Tower - 9.0M Mast',
    description: 'The ACE LT 9000 is an industrial-grade mobile lighting tower powered by an air-cooled KD15-441 Kohler engine (8.1 BHP @ 3000 RPM) and Maccalte/NSM 5 kVA brushless alternator. Driving 4 high-power 400W LED floodlights delivering 2,32,000 lumens across 7,000 square meters on a 9.0-meter telescopic mast with 359° rotation.',
    image: '/images/products/Diesel oprated/ACE LT 9000(1).png',
    gallery: [
      '/images/products/Diesel oprated/ACE LT 9000(1).png',
      '/images/products/Diesel oprated/ACE LT 9000(2).png',
      '/images/products/Diesel oprated/ACE LT 9000(3).png'
    ],
    featureImage: '/images/features/features-diesel-6000.jpg',
    bestFor: [
      {
        title: 'National Highway & Expressway Night Paving',
        desc: 'Continuous asphalt paving, road roller compaction, and worker safety.',
        image: '/images/bestfor/diesel-highway.jpg'
      },
      {
        title: 'Open-Cast Mining & Heavy Quarrying',
        desc: 'Deep open pit excavation, mineral extraction, and haul road illumination.',
        image: '/images/bestfor/diesel-mining.jpg'
      },
      {
        title: 'Bridge & Heavy Civil Infrastructure Engineering',
        desc: 'Pier construction, concrete foundation pours, and crane operations.',
        image: '/images/bestfor/diesel-bridge.jpg'
      },
      {
        title: 'Mega Industrial Plants & Port Logistics',
        desc: '24/7 dry docks, freight container yards, and industrial manufacturing.',
        image: '/images/bestfor/diesel-ports.jpg'
      }
    ],
    quickSpecs: {
      mastHeight: { title: 'Mast height', value: '30 ft (9.0 MTR)', icon: '/images/icons/mast-height.svg' },
      light: { title: 'Light', value: '4 x 400W LED (2,32,000 Lumens)', icon: '/images/icons/led-light.svg' },
      runtime: { title: 'Runtime', value: '44+ Hours (40L / 900ml/hr)', icon: '/images/icons/runtime-in-hours.svg' },
      coverage: { title: 'Light coverage', value: 'Up to 7000 sq. m', icon: '/images/icons/light-coverage.svg' }
    },
    tableSpecs: [
      {
        engine: 'Kohler KD15-441 Air Cooled (8.1 BHP @ 3000 RPM)',
        generator: 'Maccalte / NSM 5 kVA Max, 240V, 50Hz, Singlephase, 17A Max Brushless',
        tankSize: '40 L Canopy-Integrated Diesel (Lube Oil: 1.5 L | Battery: 12V 35Ah)',
        sockets: 'Digital Hour Meter, Voltmeter & Amp. Meter, MCB per Light',
        weight: 'Approx. 700 KG',
        dimensions: 'Travel: 1.4-1.5 x 1.1-1.2 x 2.4-2.5 m | Mast: 9.0 m (GL to Light)'
      }
    ],
    features: [
      '4 x 400W LED Flood Lights delivering 2,32,000 lumens total brightness',
      'Illumination area coverage up to 7,000 square meters',
      'Kohler KD15-441 Air Cooled 8.1 BHP diesel engine running at 3000 RPM',
      'Maccalte/NSM 5 kVA brushless alternator (240V, 50Hz, 17A max single phase)',
      '40-liter diesel tank capacity delivering over 44 continuous operating hours (approx 900 ml/hr)',
      '9.0-meter vertical telescopic mast with 359° manual rotation and 6mm stainless steel wire rope',
      'Full safety suite: Earth Leakage, Overload, Over Temperature, Silencer & Exhaust Fan'
    ],
    highlights: [
      {
        title: 'Power & Engine',
        items: [
          'Engine: KD15-441, Air Cooled Make– Kohler, 8.1 BHP, RPM-3000',
          'Alternator: Maccalte/NSM, 5 kVA Max, 240V, 50Hz, Singlephase, 17A Max, Brushless',
          'Fuel Tank Capacity: 40 L (Diesel), canopy-integrated, Lube Oil: 1.5 L',
          'Battery: 12V 35Ah, Silencer integrated into canopy'
        ]
      },
      {
        title: 'Controls & Safety',
        items: [
          'Digital hour meter, Voltmeter & amp. meter',
          'Oil alert and fuel fault systems with Overload protection',
          'Emergency stop switch mounted on canopy',
          'Earth Leakage Protection & Over Temperature Protection',
          'Each light has a separate Miniature Circuit Breaker (MCB)',
          'High-performance exhaust fan for canopy ventilation'
        ]
      },
      {
        title: 'Lighting System',
        items: [
          'Lights: 4 x 400W LED Flood Lights (Total 1600W), Brightness: 2,32,000 lumens',
          'Beam Angle: Flood & Long Range, Ingress Protection: IP-66',
          'CCT: 5000 - 6500K, Surge Protection: 6kV + 10kV External',
          'Upper connection box provided & Certified CE electrical fittings'
        ]
      },
      {
        title: 'Tower Assembly & Mobility',
        items: [
          'Height: 9.0 m (Ground Level to Light), Material: Mild Steel, 3mm thick',
          'Extension/Closing: Winch (Max. 5 minutes each), 359° manual rotation',
          'Wire rope metal: Stainless steel, size: 6mm',
          'Riggers/Balancing Jacks: 4 nos. (Collapsible), Tyres: 2 Nos, Weight: Approx. 700kg'
        ]
      }
    ],
    specSheetData: {
      docRef: 'ALX-TSS-LT9000',
      title: 'ACE LT 9000',
      subtitle: 'High-Efficiency Air-Cooled Diesel Mobile Lighting Tower - 9.0M Mast',
      sections: [
        {
          category: 'Power & Engine System',
          items: [
            { name: 'Engine Model', value: 'KD15-441, Air Cooled' },
            { name: 'Engine Make', value: 'Kohler' },
            { name: 'Rated Power & Speed', value: '8.1 BHP, RPM-3000' },
            { name: 'Alternator', value: 'Maccalte / NSM, 5 kVA Max, 240V, 50Hz, Singlephase, 17A Max, Brushless' },
            { name: 'Fuel Tank Capacity', value: '40 L (Diesel), Canopy-Integrated' },
            { name: 'Fuel Consumption', value: 'Approx. 900 ml/hr (44+ Hours Runtime)' },
            { name: 'Lube Oil Capacity', value: '1.5 Liters' },
            { name: 'Starting Battery', value: '12V 35Ah with Heavy-Duty Starter' },
            { name: 'Silencer', value: 'Silencer Integrated into Canopy' }
          ]
        },
        {
          category: 'Lighting System & Optics',
          items: [
            { name: 'Lights Configuration', value: '4 x 400W LED Flood Lights (Total 1600W)' },
            { name: 'Total Brightness', value: '2,32,000 Lumens' },
            { name: 'Beam Angle', value: 'Flood & Long Range Mix' },
            { name: 'Ingress Protection', value: 'IP-66 Weatherproof' },
            { name: 'Correlated Color Temp (CCT)', value: '5000 - 6500K' },
            { name: 'Surge Protection', value: '6 kV + 10 kV External' },
            { name: 'Connection Box', value: 'Upper Connection Box Provided' },
            { name: 'Electrical Certification', value: 'Certified CE Electrical Fittings' },
            { name: 'Illumination Coverage', value: 'Up to 7,000 sq. meters' }
          ]
        },
        {
          category: 'Tower & Mast Assembly',
          items: [
            { name: 'Mast Height', value: '9.0 m (Ground Level to Light)' },
            { name: 'Material & Thickness', value: 'Mild Steel, 3 mm Thick' },
            { name: 'Extension / Closing', value: 'Manual Mechanism Winch' },
            { name: 'Extension / Closing Time', value: 'Max. 5 Minutes Each' },
            { name: 'Rotation', value: '359° Manual Rotation with Positive Lock' },
            { name: 'Wire Rope Metal', value: 'Stainless Steel' },
            { name: 'Wire Rope Size', value: '6 mm' }
          ]
        },
        {
          category: 'Chassis & Mobility',
          items: [
            { name: 'Balancing Riggers', value: '4 Nos. Collapsible Balancing Jacks' },
            { name: 'Tyres', value: '2 Nos. Heavy Pneumatic Tyres' },
            { name: 'Overall Dimensions', value: 'Length: 1.4 - 1.5 m | Width: 1.1 - 1.2 m | Height: 2.4 - 2.5 m' },
            { name: 'Gross Weight', value: 'Approx. 700 kg' },
            { name: 'Recommended Features', value: 'Separate Miniature Circuit Breaker • Earthing Provision' }
          ]
        },
        {
          category: 'Controls & Safety Systems',
          items: [
            { name: 'Control Panel', value: 'Control System Mounted Inside Canopy' },
            { name: 'Hour Meter', value: 'Digital Hour Meter' },
            { name: 'Electrical Meters', value: 'Voltmeter & Amp. Meter' },
            { name: 'Fault Monitoring', value: 'Oil Alert and Fuel Fault Systems' },
            { name: 'Protections', value: 'Overload Protection, Earth Leakage Protection, Over Temperature Protection' },
            { name: 'Circuit Breakers', value: 'Each Light Has a Separate Miniature Circuit Breaker (MCB)' },
            { name: 'Emergency Controls', value: 'Emergency Stop Switch' },
            { name: 'Ventilation', value: 'Exhaust Fan' }
          ]
        }
      ]
    },
    variants: ['ace-lt-12000', 'ace-lt-6000']
  },

  'ace-lt-6000': {
    id: 'ace-lt-6000',
    title: 'ACE LT 6000',
    category: 'diesel',
    categoryName: 'Diesel Powered',
    tagline: 'Reliable 4-Light Diesel Mobile Lighting Tower - 7.0M Mast',
    description: 'The ACE LT 6000 is engineered for continuous night operations on highways, construction jobs, and municipal maintenance. Powered by an air-cooled KD15-441 Kohler engine (8.1 BHP @ 3000 RPM) with Maccalte/NSM 5 kVA brushless alternator and a 40-liter canopy tank, it drives 4 LED floodlights (1600W total) generating 2,32,000 lumens covering up to 5,000 square meters.',
    image: '/images/products/Diesel oprated/ACE LT 6000(1).png',
    gallery: [
      '/images/products/Diesel oprated/ACE LT 6000(1).png',
      '/images/products/Diesel oprated/ACE LT 6000(2).png',
      '/images/products/Diesel oprated/ACE LT 6000(3).png'
    ],
    featureImage: '/images/features/features-diesel-6000.jpg',
    bestFor: [
      {
        title: 'Bridge & Heavy Civil Infrastructure Engineering',
        desc: 'Pier construction, concrete foundation pours, and crane operations.',
        image: '/images/bestfor/diesel-bridge.jpg'
      },
      {
        title: 'National Highway & Expressway Night Paving',
        desc: 'Continuous asphalt paving, road roller compaction, and worker safety.',
        image: '/images/bestfor/diesel-highway.jpg'
      },
      {
        title: 'Open-Cast Mining & Heavy Quarrying',
        desc: 'Deep open pit excavation, mineral extraction, and haul road illumination.',
        image: '/images/bestfor/diesel-mining.jpg'
      },
      {
        title: 'Mega Industrial Plants & Port Logistics',
        desc: '24/7 dry docks, freight container yards, and industrial manufacturing.',
        image: '/images/bestfor/diesel-ports.jpg'
      }
    ],
    quickSpecs: {
      mastHeight: { title: 'Mast height', value: '23 ft (7.0 MTR)', icon: '/images/icons/mast-height.svg' },
      light: { title: 'Light', value: '4 x 400W LED (2,32,000 Lumens)', icon: '/images/icons/led-light.svg' },
      runtime: { title: 'Runtime', value: '44+ Hours (40L / 900ml/hr)', icon: '/images/icons/runtime-in-hours.svg' },
      coverage: { title: 'Light coverage', value: 'Up to 5000 sq. m', icon: '/images/icons/light-coverage.svg' }
    },
    tableSpecs: [
      {
        engine: 'Kohler KD15-441 Air Cooled (8.1 BHP @ 3000 RPM)',
        generator: 'Maccalte / NSM 5 kVA Max, 240V, 50Hz, Singlephase, 17A Max Brushless',
        tankSize: '40 L Canopy-Integrated Diesel (Lube Oil: 1.5 L | Battery: 12V 35Ah)',
        sockets: 'Digital Hour Meter, Voltmeter & Amp. Meter, MCB per Light',
        weight: '600 KG',
        dimensions: 'Travel: 1.4-1.5 x 1.1-1.2 x 2.4-2.5 m | Mast: 7.0 m (GL to Light)'
      }
    ],
    features: [
      '4 x 400W LED Flood Lights delivering 2,32,000 lumens total brightness',
      'Illumination area coverage up to 5,000 square meters',
      'Kohler KD15-441 Air Cooled 8.1 BHP diesel engine running at 3000 RPM',
      'Maccalte/NSM 5 kVA brushless alternator (240V, 50Hz, 17A max single phase)',
      '40-liter diesel tank capacity delivering over 44 continuous operating hours (approx 900 ml/hr)',
      '7.0-meter vertical telescopic mast with 359° manual rotation and 6mm stainless steel wire rope',
      'Full safety suite: Earth Leakage, Overload, Over Temperature, Silencer & Exhaust Fan'
    ],
    highlights: [
      {
        title: 'Power & Engine',
        items: [
          'Engine: KD15-441, Air Cooled Make– Kohler, 8.1 BHP, RPM-3000',
          'Alternator: Maccalte/NSM, 5 kVA Max, 240V, 50Hz, Singlephase, 17A Max, Brushless',
          'Fuel Tank Capacity: 40 L (Diesel), canopy-integrated, Lube Oil: 1.5 L',
          'Battery: 12V 35Ah, Silencer integrated into canopy'
        ]
      },
      {
        title: 'Controls & Safety',
        items: [
          'Digital hour meter, Voltmeter & amp. meter',
          'Oil alert and fuel fault systems with Overload protection',
          'Emergency stop switch mounted on canopy',
          'Earth Leakage Protection & Over Temperature Protection',
          'Each light has a separate Miniature Circuit Breaker (MCB)',
          'High-performance exhaust fan for canopy ventilation'
        ]
      },
      {
        title: 'Lighting System',
        items: [
          'Lights: 4 x 400W LED Flood Lights (Total 1600W), Brightness: 2,32,000 lumens',
          'Beam Angle: Flood & Long Range, Ingress Protection: IP-66',
          'CCT: 5000 - 6500K, Surge Protection: 6kV + 10kV External',
          'Upper connection box provided & Certified CE electrical fittings'
        ]
      },
      {
        title: 'Tower Assembly & Mobility',
        items: [
          'Height: 7.0 m (Ground Level to Light), Material: Mild Steel, 3mm thick',
          'Extension/Closing: Winch (Max. 5 minutes each), 359° manual rotation',
          'Wire rope metal: Stainless steel, size: 6mm',
          'Riggers/Balancing Jacks: 4 nos. (Collapsible), Tyres: 2 Nos, Weight: 600kg'
        ]
      }
    ],
    specSheetData: {
      docRef: 'ALX-TSS-LT6000',
      title: 'ACE LT 6000',
      subtitle: 'Reliable 4-Light Diesel Mobile Lighting Tower - 7.0M Mast',
      sections: [
        {
          category: 'Power & Engine System',
          items: [
            { name: 'Engine Model', value: 'KD15-441, Air Cooled' },
            { name: 'Engine Make', value: 'Kohler' },
            { name: 'Rated Power & Speed', value: '8.1 BHP, RPM-3000' },
            { name: 'Alternator', value: 'Maccalte / NSM, 5 kVA Max, 240V, 50Hz, Singlephase, 17A Max, Brushless' },
            { name: 'Fuel Tank Capacity', value: '40 L (Diesel), Canopy-Integrated' },
            { name: 'Fuel Consumption', value: 'Approx. 900 ml/hr (44+ Hours Runtime)' },
            { name: 'Lube Oil Capacity', value: '1.5 Liters' },
            { name: 'Starting Battery', value: '12V 35Ah with Heavy-Duty Starter' },
            { name: 'Silencer', value: 'Silencer Integrated into Canopy' }
          ]
        },
        {
          category: 'Lighting System & Optics',
          items: [
            { name: 'Lights Configuration', value: '4 x 400W LED Flood Lights (Total 1600W)' },
            { name: 'Total Brightness', value: '2,32,000 Lumens' },
            { name: 'Beam Angle', value: 'Flood & Long Range Mix' },
            { name: 'Ingress Protection', value: 'IP-66 Weatherproof' },
            { name: 'Correlated Color Temp (CCT)', value: '5000 - 6500K' },
            { name: 'Surge Protection', value: '6 kV + 10 kV External' },
            { name: 'Connection Box', value: 'Upper Connection Box Provided' },
            { name: 'Electrical Certification', value: 'Certified CE Electrical Fittings' },
            { name: 'Illumination Coverage', value: 'Up to 5,000 sq. meters' }
          ]
        },
        {
          category: 'Tower & Mast Assembly',
          items: [
            { name: 'Mast Height', value: '7.0 m (Ground Level to Light)' },
            { name: 'Material & Thickness', value: 'Mild Steel, 3 mm Thick' },
            { name: 'Extension / Closing', value: 'Manual Mechanism Winch' },
            { name: 'Extension / Closing Time', value: 'Max. 5 Minutes Each' },
            { name: 'Rotation', value: '359° Manual Rotation with Positive Lock' },
            { name: 'Wire Rope Metal', value: 'Stainless Steel' },
            { name: 'Wire Rope Size', value: '6 mm' }
          ]
        },
        {
          category: 'Chassis & Mobility',
          items: [
            { name: 'Balancing Riggers', value: '4 Nos. Collapsible Balancing Jacks' },
            { name: 'Tyres', value: '2 Nos. Heavy Pneumatic Tyres' },
            { name: 'Overall Dimensions', value: 'Length: 1.4 - 1.5 m | Width: 1.1 - 1.2 m | Height: 2.4 - 2.5 m' },
            { name: 'Gross Weight', value: '600 kg' },
            { name: 'Recommended Features', value: 'Separate Miniature Circuit Breaker • Earthing Provision' }
          ]
        },
        {
          category: 'Controls & Safety Systems',
          items: [
            { name: 'Control Panel', value: 'Control System Mounted Inside Canopy' },
            { name: 'Hour Meter', value: 'Digital Hour Meter' },
            { name: 'Electrical Meters', value: 'Voltmeter & Amp. Meter' },
            { name: 'Fault Monitoring', value: 'Oil Alert and Fuel Fault Systems' },
            { name: 'Protections', value: 'Overload Protection, Earth Leakage Protection, Over Temperature Protection' },
            { name: 'Circuit Breakers', value: 'Each Light Has a Separate Miniature Circuit Breaker (MCB)' },
            { name: 'Emergency Controls', value: 'Emergency Stop Switch' },
            { name: 'Ventilation', value: 'Exhaust Fan' }
          ]
        }
      ]
    },
    variants: ['ace-lt-12000', 'ace-lt-9000']
  },

  // ── 2. MOBILE TOWER WITHOUT GENSET ─────────────────────────────────
  'without-genset': {
    id: 'without-genset',
    title: 'Mobile Light Tower without Genset',
    category: 'without-genset',
    categoryName: 'Mobile Tower Without Genset',
    tagline: 'High-Performance 80,000 Lumens Grid-Powered 12.0M Mobile Tower',
    description: 'The Mobile Light Tower without Genset 12 mtr with 4 LED is an ultra-reliable, zero-emission lighting tower engineered for connection to external 220V power or site generators. Equipped with 4 x 200W Bajaj LED floodlights delivering 80,000 lumens across 3,800 square meters on a heavy-duty 12.0-meter mild steel mast.',
    image: '/images/products/Mobile Tower Without Genset/withoutgenset-angle1.jpg',
    gallery: [
      '/images/products/Mobile Tower Without Genset/withoutgenset-angle1.jpg',
      '/images/products/Mobile Tower Without Genset/withoutgenset-angle2.jpg',
      '/images/products/Mobile Tower Without Genset/withoutgenset-angle3.jpg'
    ],
    featureImage: '/images/features/features-grid.jpg',
    bestFor: [
      {
        title: 'High-Rise & Commercial Building Foundations',
        desc: 'Direct connection to site distribution board for continuous foundation builds.',
        image: '/images/bestfor/grid-construction.jpg'
      },
      {
        title: 'Concrete Batching Plants & Precast Yards',
        desc: 'Zero-emission illumination for concrete mix transit and aggregate handling.',
        image: '/images/bestfor/grid-batching.jpg'
      },
      {
        title: 'Shipbuilding Docks & Marine Terminals',
        desc: 'Safe, fume-free illumination for enclosed dry docks and vessel hull repair.',
        image: '/images/bestfor/grid-shipyard.jpg'
      },
      {
        title: 'Continuous Grid-Connected Rail Freight Hubs',
        desc: '24/7 container handling and locomotive marshaling yards with grid power.',
        image: '/images/bestfor/grid-freight.jpg'
      }
    ],
    quickSpecs: {
      mastHeight: { title: 'Mast height', value: '39 ft (12.0 MTR)', icon: '/images/icons/mast-height.svg' },
      light: { title: 'Light', value: '4 x 200W LED = 800W Bajaj (80,000 Lumens)', icon: '/images/icons/led-light.svg' },
      runtime: { title: 'Runtime', value: 'Continuous Grid / External Power', icon: '/images/icons/runtime-in-hours.svg' },
      coverage: { title: 'Light coverage', value: 'Up to 3800 sq. m', icon: '/images/icons/light-coverage.svg' }
    },
    tableSpecs: [
      {
        engine: 'External 220V Grid / Onsite Genset Input (Fume-Free)',
        generator: 'Upper Connection Box & Certified CE Electrical Fittings',
        tankSize: 'Direct Power Supply (Zero Fuel Required)',
        sockets: 'Earth Leakage Protection & Separate MCB per Light',
        weight: 'Approx. 400 / 450 KG',
        dimensions: 'Length: 1635 mm | Width: 1354 mm | Mast: 12.0 m (Mild Steel 4mm)'
      }
    ],
    features: [
      'Technical Specification – Mobile Light Tower without genset 12 mtr with 4 LED',
      '4 x 200W LED Flood Lights (Total 800W) Make- Bajaj (80,000 Lumens / 100 lm/w)',
      'Beam Angle: 30 Degree & 60 Degree Mix for surrounding and perimeter coverage',
      'Area illumination coverage up to 3,800 square meters',
      '12.0-meter heavy-duty Mild Steel mast (4 mm wall thickness) with manual winch',
      'Extension / Closing / Tilt time: Max. 2 minutes each with 10mm stainless steel wire rope',
      'Controls & Safety: Control system, Earth Leakage protection, 2 Safety switches, MCB per light',
      'Chassis: 4 collapsible balancing jacks, 2 tyres (8/9"), 2 leaf springs, 4 loading hooks'
    ],
    highlights: [
      {
        title: 'Lighting System',
        items: [
          'Lights: 4 x 200W LED Flood Lights (Total 800W) Make- Bajaj',
          'Beam Angle - 30 Degree & 60 Degree Mix',
          'Brightness: 80,000 lumens (100 lm/w)',
          'Ingress Protection: IP-66, CCT: 5000 - 6500K',
          'Upper connection box provided & Certified CE electrical fittings',
          'Illumination coverage up to 3800 sq. meters'
        ]
      },
      {
        title: 'Tower Assembly',
        items: [
          'Height: 12.0 m (Ground Level to Light), Material: Mild Steel, 4 mm thick',
          'Extension/Closing/Tilt: Manual winch (Max. 2 minutes each)',
          'Wire rope metal: Stainless steel, Wire rope size: 10mm',
          'Safety switches: 02 nos.'
        ]
      },
      {
        title: 'Controls & Safety',
        items: [
          'Control system, Earth Leakage protection',
          'Each light has a separate Miniature Circuit Breaker'
        ]
      },
      {
        title: 'Chassis & Mobility',
        items: [
          'Riggers/Balancing Jacks: 4 nos. (Collapsible)',
          'Tyre: 2 x 8/9", Leaf Spring: 2 nos., Loading Hooks: 4 nos.',
          'Dimensions (Approx.): Length: 1635mm, Width: 1354mm',
          'Weight: Approx. 400/450 kg'
        ]
      }
    ],
    specSheetData: {
      docRef: 'ALX-TSS-WG12000',
      title: 'Mobile Light Tower without Genset 12 mtr with 4 LED',
      subtitle: 'Zero-Emission Grid-Powered Mobile Light Tower',
      sections: [
        {
          category: 'Lighting System & Optics',
          items: [
            { name: 'Lights Configuration', value: '4 x 200W LED Flood Lights (Total 800W) Make- Bajaj' },
            { name: 'Beam Angle', value: '30 Degree & 60 Degree Mix' },
            { name: 'Brightness', value: '80,000 Lumens (100 lm/w)' },
            { name: 'Ingress Protection', value: 'IP-66' },
            { name: 'Correlated Color Temp (CCT)', value: '5000 - 6500K' },
            { name: 'Upper Connection Box', value: 'Provided' },
            { name: 'Electrical Standards', value: 'Certified CE Electrical Fittings' },
            { name: 'Illumination Coverage', value: 'Up to 3,800 sq. meters' }
          ]
        },
        {
          category: 'Tower & Mast Assembly',
          items: [
            { name: 'Tower Height', value: '12.0 m (Ground Level to Light)' },
            { name: 'Material & Thickness', value: 'Mild Steel, 4 mm Thick' },
            { name: 'Extension / Closing / Tilt', value: 'Manual Winch' },
            { name: 'Extension / Closing Time', value: 'Max. 2 Minutes Each' },
            { name: 'Wire Rope Metal', value: 'Stainless Steel' },
            { name: 'Wire Rope Size', value: '10 mm' },
            { name: 'Safety Switches', value: '02 Nos.' }
          ]
        },
        {
          category: 'Controls & Safety Systems',
          items: [
            { name: 'Control System', value: 'Integrated Control System' },
            { name: 'Earth Leakage', value: 'Earth Leakage Protection' },
            { name: 'Circuit Protection', value: 'Each Light Has a Separate Miniature Circuit Breaker (MCB)' }
          ]
        },
        {
          category: 'Chassis, Wheels & Mobility',
          items: [
            { name: 'Balancing Riggers', value: '4 Nos. (Collapsible)' },
            { name: 'Tyres', value: '2 x 8/9"' },
            { name: 'Suspension', value: 'Leaf Spring (2 Nos.)' },
            { name: 'Loading Hooks', value: '4 Nos.' },
            { name: 'Approx Dimensions', value: 'Length: 1635 mm | Width: 1354 mm' },
            { name: 'Total Weight', value: 'Approx. 400 / 450 kg' }
          ]
        }
      ]
    },
    variants: ['ace-lt-12000', 'ace-5-slt-6000', 'ace-1-2-it-4500']
  },

  // ── 3. PETROL POWERED ──────────────────────────────────────────────
  'ace-plt-4000': {
    id: 'ace-plt-4000',
    title: 'ACE PLT 4000',
    category: 'petrol',
    categoryName: 'Petrol Operated',
    tagline: 'Compact Portable Honda-Powered Petrol Light Tower - 4.0M Mast',
    description: 'The ACE PLT 4000 is a lightweight, ultra-portable mobile lighting tower powered by a genuine Honda EP-1000 generator (CPCB Approved, 750VA). Delivering 69,600 lumens from 6 energy-efficient 80W LED floodlights (145 lm/w, IP67) on a 4-meter telescopic anodized aluminum mast with pneumatic and manual raising.',
    image: '/images/products/Petrol oprated/ACE PLT 4000.png',
    gallery: [
      '/images/products/Petrol oprated/ACE PLT 4000.png'
    ],
    featureImage: '/images/features/features-petrol.jpg',
    bestFor: [
      {
        title: 'Railway Track Night Repairs & Maintenance Crews',
        desc: 'Lightweight setup for quick pickup-truck transport along railway track lines.',
        image: '/images/bestfor/petrol-railway.jpg'
      },
      {
        title: 'Municipal Water & Gas Pipeline Emergencies',
        desc: 'Fast-response deployment beside urban utility excavations and street breaks.',
        image: '/images/bestfor/petrol-pipeline.jpg'
      },
      {
        title: 'Fast-Response Highway Paving & Asphalt Repairs',
        desc: 'Quick setup on emergency road patchwork and temporary nighttime lane closures.',
        image: '/images/bestfor/petrol-roadworks.jpg'
      },
      {
        title: 'Perimeter Security & Remote Field Camps',
        desc: 'Instant pull-start Honda power for security checkpoints and border patrols.',
        image: '/images/bestfor/petrol-perimeter.jpg'
      }
    ],
    quickSpecs: {
      mastHeight: { title: 'Mast height', value: '13 ft (4.0 MTR Pneumatic)', icon: '/images/icons/mast-height.svg' },
      light: { title: 'Light', value: '6 x 80W LED (69,600 Lumens)', icon: '/images/icons/led-light.svg' },
      runtime: { title: 'Runtime', value: 'Approx 9 Hours (3.6L / 400ml/hr)', icon: '/images/icons/runtime-in-hours.svg' },
      coverage: { title: 'Light coverage', value: '4000 sq. m', icon: '/images/icons/light-coverage.svg' }
    },
    tableSpecs: [
      {
        engine: 'Honda EP-1000, Petrol Run, Air Cooled (CPCB Approved, 750VA)',
        generator: 'Integrated Alternator with 16A AC Socket',
        tankSize: '3.6 Ltr Petrol (Consumption ~400 ml/hr | Lube Oil: 360 ml)',
        sockets: '6 x 80W LED = 480W | 69,600 Lumens | Rotary Dimming',
        weight: 'Ultra Lightweight Portable (FRP 4mm & Anodized Al)',
        dimensions: 'Erected: 4000 mm | Retract: 1050 mm | Segments: 6 (Pneumatic & Manual)'
      }
    ],
    features: [
      'Honda EP-1000 generator (CPCB approved, petrol run, air cooled, rated output 750VA)',
      '6 x 80W LED luminaires delivering 69,600 lumens with high efficacy (145 lm/w)',
      '3.6-liter petrol tank with economical ~400 ml/hr consumption (~9 hours runtime)',
      'Telescopic Anodized Aluminum mast (6 segments), erected 4000mm, retract 1050mm',
      'Pneumatic erection with inbuilt pump and manual mechanism (55 seconds max)',
      'Rotary type dimming function with constant power potted driver and short circuit protection',
      'BIS approved make embossed on LED lens as per IS 10322 (part 5/ sec 5)',
      'Rugged structure: FRP 4mm minimum, 3mm aluminum base plate, SS-304 cradle, SS hardware'
    ],
    highlights: [
      {
        title: 'GENSET & Power',
        items: [
          'GENSET (CPCB Approved): Honda EP-1000, Petrol run, Air cooled, Rated output-750va',
          'Tank capacity / Consumption: 3.6ltr (Petrol) / Approx- 400ml/hr',
          'Lube Oil Capacity: 360ml',
          'Socket for AC: Yes 16amp'
        ]
      },
      {
        title: 'Lighting System & Optics',
        items: [
          'No & Power of light: 6 x 80w - 480w LED, Brightness: 69600 Lumens (145 lm/w)',
          'LED Luminaire ingress Protection: IP67, CCT: 5500K (+/-500K), CRI >= 75',
          'Driver Type: Constant Power mode potted driver with short circuit & high voltage cut off',
          'Dimming Function: Rotary Type, Operating temp: -20deg.c to +50deg.c',
          'LED BIS certified as per IS 10322(part 5/ sec 5)'
        ]
      },
      {
        title: 'Tower Assembly',
        items: [
          'Tower type: Telescopic, Anodized Aluminum, 6 Segments Minimum',
          'Tower Height (Erected): 4000mm Minimum, Retract: 1050mm (+/- 50mm)',
          'Tower mast wall thickness: 1.55mm Minimum',
          'Method: Pneumatic with inbuilt pump & Manual also (55 seconds max)'
        ]
      },
      {
        title: 'Structure & Hardware',
        items: [
          'Main structure type: FRP 4mm Minimum',
          'Bottom Base Plate: 3mm Aluminum with powder coated',
          'Rigger & Wheel Bracket: Mild steel(cr) with powder coated',
          'Bracket for LED (Cradle) metal: SS-304, Hardware (Nut-Bolt-washer): SS'
        ]
      }
    ],
    specSheetData: {
      docRef: 'ALX-TSS-PLT4000',
      title: 'ACE PLT 4000',
      subtitle: 'Honda EP-1000 Petrol Mobile Lighting Tower - 4.0M Mast',
      sections: [
        {
          category: 'Engine & Generator System',
          items: [
            { name: 'GENSET (CPCB Approved)', value: 'Honda EP-1000, Petrol run, Air cooled, Rated output-750va' },
            { name: 'Tank Capacity / Consumption', value: '3.6 Ltr (Petrol) / Fuel consumption approx- 400ml/hr' },
            { name: 'Lube Oil Capacity', value: '360 ml' },
            { name: 'Socket for AC', value: 'Yes 16amp' }
          ]
        },
        {
          category: 'Lighting System & Optics',
          items: [
            { name: 'No & Power of Light', value: '6 x 80W - 480W Total' },
            { name: 'Light Source & Metal', value: 'LED, Aluminum Luminaire Metal' },
            { name: 'Brightness & Luminous Efficacy', value: '69,600 Lumens | 145 lm/w' },
            { name: 'Ingress Protection', value: 'IP67 Weatherproof' },
            { name: 'Color Temperature (CCT)', value: '5500K (+/- 500K), CRI >= 75' },
            { name: 'Operating Temperature', value: '-20 deg. C to +50 deg. C' },
            { name: 'BIS Certification', value: 'BIS approved make embossed on LED lens as per IS 10322(part 5/ sec 5)' },
            { name: 'Driver Type', value: 'Constant Power potted driver with short circuit & high voltage cut off' },
            { name: 'Dimming Function', value: 'Rotary Type' }
          ]
        },
        {
          category: 'Tower & Elevation Assembly',
          items: [
            { name: 'Tower Type & Material', value: 'Telescopic type, Anodized Aluminum' },
            { name: 'Tower Segments', value: '6 Minimum' },
            { name: 'Tower Height (Erected)', value: '4000 mm Minimum (4.0 Mtr)' },
            { name: 'Tower Mast Height (Retract)', value: '1050 mm (+/- 50 mm)' },
            { name: 'Tower Mast Wall Thickness', value: '1.55 mm Minimum' },
            { name: 'Erected & Retract Method', value: 'Pneumatic with Inbuilt Pump & Manual also' },
            { name: 'Erected & Retract Time', value: '55 Seconds Maximum' }
          ]
        },
        {
          category: 'Mechanical Structure & Hardware',
          items: [
            { name: 'Main Structure Type', value: 'FRP 4 mm Minimum' },
            { name: 'Bottom Base Plate', value: '3 mm Aluminum with Powder Coated' },
            { name: 'Top Bracket', value: 'MS Pipe (CR Pipe 25.4mm minimum) with Powder Coated' },
            { name: 'Rigger & Wheel Bracket', value: 'Mild Steel (CR) with Powder Coated' },
            { name: 'Bracket for LED (Cradle)', value: 'SS-304' },
            { name: 'Hardware', value: 'Stainless Steel (SS Nut-Bolt-Washer)' }
          ]
        }
      ]
    },
    variants: ['ace-pblt-4000', 'ace-b-04', 'without-genset']
  },

  'ace-pblt-4000': {
    id: 'ace-pblt-4000',
    title: 'ACE PBLT 4000',
    category: 'hybrid',
    categoryName: 'Battery & Petrol Operated',
    tagline: 'Hybrid Battery & AC Mobile Light Tower - 4.0M Mast',
    description: 'The ACE PBLT 4000 is an advanced portable battery-operated mobile lighting tower delivering 51,000 lumens from 6 x 60W LED luminaires. Powered by a 48V 60Ah battery bank providing up to 12 hours backup, with a 4.0-meter anodized aluminum telescopic mast and 16A AC socket for continuous operation.',
    image: '/images/products/Battery-Petrol Hybrid/PBLT 4000(1).png',
    gallery: [
      '/images/products/Battery-Petrol Hybrid/PBLT 4000(1).png',
      '/images/products/Battery-Petrol Hybrid/PBLT 4000(2).png',
      '/images/products/Battery-Petrol Hybrid/PBLT 4000(3).png'
    ],
    featureImage: '/images/features/features-hybrid.jpg',
    bestFor: [
      {
        title: 'Fast-Response Highway Paving & Asphalt Repairs',
        desc: 'Hybrid silent running allows early morning road works without noise pollution.',
        image: '/images/bestfor/petrol-roadworks.jpg'
      },
      {
        title: 'Municipal Water & Gas Pipeline Emergencies',
        desc: 'Continuous dual-power system ensures uninterrupted lighting during long repair jobs.',
        image: '/images/bestfor/petrol-pipeline.jpg'
      },
      {
        title: 'Railway Track Night Repairs & Maintenance Crews',
        desc: 'Ultra-flexible battery power for remote track sections with zero fumes.',
        image: '/images/bestfor/petrol-railway.jpg'
      },
      {
        title: 'Perimeter Security & Remote Field Camps',
        desc: 'Battery mode for silent covert operations; AC mode for continuous floodlighting.',
        image: '/images/bestfor/petrol-perimeter.jpg'
      }
    ],
    quickSpecs: {
      mastHeight: { title: 'Mast height', value: '13 ft (4.0 MTR)', icon: '/images/icons/mast-height.svg' },
      light: { title: 'Light', value: '6 x 60W LED (51,000 Lumens)', icon: '/images/icons/led-light.svg' },
      runtime: { title: 'Runtime', value: '6 - 12 Hours (48V 60Ah)', icon: '/images/icons/runtime-in-hours.svg' },
      coverage: { title: 'Light coverage', value: '3500 sq. m', icon: '/images/icons/light-coverage.svg' }
    },
    tableSpecs: [
      {
        engine: 'Power Source: 360W, Output 230V | Battery: 48V 60Ah',
        generator: 'Constant Power Mode Driver with 3-Mode Dimming',
        tankSize: 'Backup: High: 6 Hrs | Medium: 9 Hrs | Low: 12 Hrs',
        sockets: '16A AC Socket | 6 x 60W LED = 360W | 51,000 Lumens',
        weight: '50 KG Max (Compact Portable Design)',
        dimensions: 'Erected: 4000 mm | Retract: 1050 mm | Box: 500 x 485 x 1050 mm'
      }
    ],
    features: [
      'Dual power: 360W source, 230V output with built-in 48V 60Ah high-capacity battery bank',
      'Battery runtime: High Mode: 6 Hrs | Medium Mode: 9 Hrs | Low Mode: 12 Hrs',
      '6 x 60W LED luminaires delivering 51,000 lumens (145 lm/w, IP66, 6000K)',
      '4000mm (4.0m) Anodized Aluminum 6-segment telescopic mast, retracts to 1050mm',
      '16A AC socket for powering site tools or charging external equipment',
      'Constant power driver with 3-mode dimming function and BIS certification',
      'Compact footprint: 500 x 485 x 1050 mm, 50 kg max weight with 2 transport wheels',
      'Rapid 2-minute setup time; includes built-in storage box and toolkit'
    ],
    highlights: [
      {
        title: 'Power & Battery Bank',
        items: [
          'Power Source: 360w, out-put 230v',
          'Battery capacity: 48v 60h (60Ah)',
          'Battery Backup: High: 6 Hrs, Medium: 9 Hrs, Low: 12 Hrs',
          'Socket for AC: Yes 16amp'
        ]
      },
      {
        title: 'Lighting System',
        items: [
          'No & Power of light: 6 x 60w - 360w LED, Aluminum Luminaire Metal',
          'Brightness: 51,000 Lumens, Luminous efficacy: 145 lm/w, IP66',
          'Led CCT: 6000k, CRI >= 75, LED BIS certified: Yes',
          'Driver: Constant power mode, Dimming: Three mode type only',
          'Lux at 60m (360° position): 1.5 lux Approx | (180° position): 5.0 Lux Approx'
        ]
      },
      {
        title: 'Tower Assembly',
        items: [
          'Tower type: Telescopic, Anodized Aluminum, 6 Segments Minimum',
          'Tower Height (Erected): 4000mm Minimum, Retract: 1050mm Minimum',
          'Tower mast wall thickness: 1.55mm Minimum, Method: Manual (1.5 min approx)',
          'Rigger opening: 1200mm +/- 100mm in diameter, Hardware: SS, Cradle: SS-304'
        ]
      },
      {
        title: 'Dimensions & Portability',
        items: [
          'Wheel: 02 nos., Weight: 50 Kg Max',
          'Length: 500mm +/- 10mm, Width: 485mm +/- 10mm, Height: 1050mm +/- 10mm',
          'Installation & Close Time: 2 Minutes Max. (Approx)',
          'Storage box: Yes, Tool kit: Yes (As per machine requirement)'
        ]
      }
    ],
    specSheetData: {
      docRef: 'ALX-TSS-PBLT4000',
      title: 'ACE PBLT 4000',
      subtitle: 'Battery & AC Portable Mobile Lighting Tower - 4.0M Mast',
      sections: [
        {
          category: 'Power & Battery Specifications',
          items: [
            { name: 'Power Source', value: '360W, Output 230V' },
            { name: 'Battery Capacity', value: '48V 60Ah' },
            { name: 'Battery Backup', value: 'High: 6 Hrs | Medium: 9 Hrs | Low: 12 Hrs' },
            { name: 'Socket for AC', value: 'Yes 16amp' },
            { name: 'Working Temperature', value: '-40 deg. C to 90 deg. C' }
          ]
        },
        {
          category: 'Lighting System & Photometrics',
          items: [
            { name: 'No & Power of Light', value: '6 x 60W - 360W Total' },
            { name: 'Light Source & Metal', value: 'LED, Aluminum Luminaire Metal' },
            { name: 'Brightness', value: '51,000 Lumens' },
            { name: 'Luminous Efficacy', value: '145 lm/w' },
            { name: 'Ingress Protection', value: 'IP66' },
            { name: 'Color Temperature (CCT)', value: '6000K, CRI >= 75' },
            { name: 'Operating Temperature', value: '-20 deg. C to +50 deg. C' },
            { name: 'Driver / Controller', value: 'Constant Power Mode' },
            { name: 'Dimming Function', value: 'Three Mode Type Only' },
            { name: 'Lux at 60m (360° Position)', value: '1.5 Lux Approx' },
            { name: 'Lux at 60m (180° Position)', value: '5.0 Lux Approx' },
            { name: 'BIS Certified', value: 'Yes' }
          ]
        },
        {
          category: 'Tower & Elevation Assembly',
          items: [
            { name: 'Tower Type & Material', value: 'Telescopic type, Anodized Aluminum' },
            { name: 'Tower Segments', value: '6 Minimum' },
            { name: 'Tower Height (Erected)', value: '4000 mm Minimum' },
            { name: 'Tower Mast Height (Retract)', value: '1050 mm Minimum' },
            { name: 'Mast Wall Thickness', value: '1.55 mm Minimum' },
            { name: 'Erected & Retract Method', value: 'Manual' },
            { name: 'Erected & Retract Time', value: '1.5 Minutes (Approx)' },
            { name: 'Rigger Opening', value: '1200 mm +/- 100 mm in Diameter' }
          ]
        },
        {
          category: 'Dimensions, Weight & Logistics',
          items: [
            { name: 'Wheels', value: '02 Nos.' },
            { name: 'Length', value: '500 mm +/- 10 mm' },
            { name: 'Width', value: '485 mm +/- 10 mm' },
            { name: 'Height', value: '1050 mm +/- 10 mm' },
            { name: 'Weight', value: '50 Kg Max' },
            { name: 'Installation & Close Time', value: '2 Minutes Max. (Approx)' },
            { name: 'Storage Box & Tool Kit', value: 'Storage Box Included | Tool Kit Included' }
          ]
        }
      ]
    },
    variants: ['ace-plt-4000', 'ace-b-04', 'ace-3-slt-6000']
  },

  // ── 4. INFLATABLE TOWER ────────────────────────────────────────────
  'ace-1-2-it-4500': {
    id: 'ace-1-2-it-4500',
    title: 'ACE 1.2 IT 4500',
    category: 'inflatable',
    categoryName: 'Inflatable Tower',
    tagline: '360° Glare-Free 42,000 Lumens Inflatable Balloon Light Tower',
    description: 'The ACE 1.2 IT 4500 is a revolutionary inflatable column light tower providing 360-degree glare-free diffused illumination across 10,000 square meters. Featuring an onboard 230V 1200VA power system with an 8-liter fuel tank and automatic air blower, the cylinder inflates to 4.5 meters in under 60 seconds.',
    image: '/images/products/Inflatable tower/ACE 1.2 IT 4500.png',
    gallery: [
      '/images/products/Inflatable tower/ACE 1.2 IT 4500.png'
    ],
    featureImage: '/images/features/features-inflatable.jpg',
    bestFor: [
      {
        title: '360° Glare-Free Highway Roadworks & Traffic Diversion',
        desc: 'Diffused shadow-free illumination that prevents blinding oncoming drivers on active roadways.',
        image: '/images/bestfor/inflatable-highway.jpg'
      },
      {
        title: 'Disaster Relief, Emergency Rescue & Field Hospitals',
        desc: 'Rapid 60-second automatic inflation provides immediate 360-degree emergency light coverage.',
        image: '/images/bestfor/inflatable-rescue.jpg'
      },
      {
        title: 'Night Municipal Utility & Pipeline Maintenance',
        desc: 'Complete circular lighting coverage without harsh shadows, ideal for municipal work crews.',
        image: '/images/bestfor/inflatable-pipeline.jpg'
      },
      {
        title: 'Outdoor Events, Sports Arenas & Perimeter Security',
        desc: 'Pleasant, soft non-glare ambiance perfect for large festival entrances and night gatherings.',
        image: '/images/bestfor/inflatable-events.jpg'
      }
    ],
    quickSpecs: {
      mastHeight: { title: 'Tower height', value: '15 ft (4.5 MTR)', icon: '/images/icons/mast-height.svg' },
      light: { title: 'Brightness', value: '42,000 Lumens (360° Glare-Free)', icon: '/images/icons/led-light.svg' },
      runtime: { title: 'Runtime', value: '10-12 Hours (8 Ltr Tank)', icon: '/images/icons/runtime-in-hours.svg' },
      coverage: { title: 'Light coverage', value: '10,000 sq. m', icon: '/images/icons/light-coverage.svg' }
    },
    tableSpecs: [
      {
        engine: '230 VOLT 1200VA SINGLE PHASE +-5 VOLT',
        generator: 'Integrated High-Pressure Inflation Blower',
        tankSize: 'TANK CAPACITY: 8 Ltr | LUBE OIL CAPACITY: 400 ml',
        sockets: 'Brightness: 42,000 Lumens | Area Illumination: 10,000 sq/m',
        weight: '50 KG',
        dimensions: 'Tower Height: 4.5 mtr\nTravel: 0.6 x 0.5 x 0.8 m | Operation: 0.6 x 0.5 x 4.5 m'
      }
    ],
    features: [
      'Massive 10,000 square meter area illumination with 360-degree diffusion',
      '42,000 lumens total brightness eliminating dark shadows and driver blinding',
      '230 Volt 1200VA single-phase electrical power base',
      '8-liter fuel tank capacity delivering all-night runtime with 400ml lube oil capacity',
      'Rapid inflation to 4.5 meters in less than 60 seconds via internal blower fan',
      'Compact 50 kg total weight, easily loaded into the boot of an SUV or utility truck'
    ],
    highlights: [
      {
        title: '360° Glare-Free Optical Balloon',
        items: [
          'High-durability translucent ripstop nylon balloon envelope',
          'Diffuses light evenly across 360 degrees without harsh blinding glare',
          'Meets highway and rail safety standards for driver and operator vision'
        ]
      },
      {
        title: 'Rapid Automated Deployment',
        items: [
          'Integrated electric blower fan inflates the column in under 60 seconds',
          'Guy lines and ground anchor pegs secure the tower in wind speeds up to 60 km/h',
          'Deflates and packs into a protective carry container in under 2 minutes'
        ]
      }
    ],
    specSheetData: {
      docRef: 'ALX-TSS-IT4500',
      title: 'ACE 1.2 IT 4500',
      subtitle: '360° Glare-Free Inflatable Balloon Light Tower - 4.5M Mast',
      sections: [
        {
          category: 'Power & Blower System',
          items: [
            { name: 'Electrical Base', value: '230V 1200VA Single Phase (+/- 5V)' },
            { name: 'Inflation Mechanism', value: 'High-Pressure Electric Inflation Blower Fan' },
            { name: 'Inflation Time', value: 'Under 60 Seconds to Full 4.5m Deployment' },
            { name: 'Fuel Tank Capacity', value: '8 Liters (10 - 12 Continuous Runtime Hours)' },
            { name: 'Lube Oil Capacity', value: '400 ml' }
          ]
        },
        {
          category: 'Lighting System & Optics',
          items: [
            { name: 'Brightness', value: '42,000 Lumens' },
            { name: 'Optical Envelope', value: 'Translucent Ripstop Balloon Fabric' },
            { name: 'Light Dispersion', value: '360° Circular Glare-Free & Shadow-Free Diffusion' },
            { name: 'Illumination Area', value: 'Up to 10,000 sq. meters' }
          ]
        },
        {
          category: 'Physical Dimensions & Weight',
          items: [
            { name: 'Deployed Height', value: '4.5 Meters (15 ft)' },
            { name: 'Gross Weight', value: '50 kg' },
            { name: 'Packaged Dimensions', value: '0.6 x 0.5 x 0.8 m' },
            { name: 'Wind Stability', value: 'Up to 60 km/h with Heavy Anchor Pegs & Guy Lines' }
          ]
        }
      ]
    },
    variants: ['ace-plt-4000', 'ace-b-04']
  },

  // ── 5. SOLAR OPERATED ──────────────────────────────────────────────
  'ace-5-slt-6000': {
    id: 'ace-5-slt-6000',
    title: 'ACE 5 SLT 6000',
    category: 'solar',
    categoryName: 'Solar Operated',
    tagline: '5.0 KVA Inverter Solar Mobile Light Tower - 7.0M Mast',
    description: 'The ACE 5 SLT 6000 is our heavy-duty zero-fuel, zero-emission solar mobile lighting tower equipped with a heavy-duty 5.0 kVA pure sine wave inverter, 4 sliding solar panels (2380W total), 48V MPPT controller, and 7.2 kWh LiFePO4 battery bank powering 4 LED floodlights (87,000 lumens) on a 7.0-meter 359° rotatable mast.',
    image: '/images/products/Solar Oprated/Solar-Powered Light Tower Trailer.png',
    gallery: [
      '/images/products/Solar Oprated/Solar-Powered Light Tower Trailer.png'
    ],
    featureImage: '/images/features/features-solar-5slt.jpg',
    bestFor: [
      {
        title: 'Eco-Sensitive Infrastructure & Green Construction Sites',
        desc: '100% emission-free, silent lighting compliant with strict environmental city regulations.',
        image: '/images/bestfor/solar-eco-construction.jpg'
      },
      {
        title: 'Remote Off-Grid Mining & Desert Exploration',
        desc: 'Self-sufficient daily solar harvesting eliminates diesel refueling trips in remote desert mines.',
        image: '/images/bestfor/solar-remote-mining.jpg'
      },
      {
        title: 'Zero-Emission Urban Highway & Residential Nightworks',
        desc: 'Zero engine exhaust fumes and silent battery discharge for quiet neighborhood repairs.',
        image: '/images/bestfor/solar-urban-highway.jpg'
      },
      {
        title: 'Solar Parks & Renewable Energy Sub-Stations',
        desc: 'Natural power pairing for utility-scale solar farms, wind parks, and green power grids.',
        image: '/images/bestfor/solar-renewables.jpg'
      }
    ],
    quickSpecs: {
      mastHeight: { title: 'Mast height', value: '23 ft (7.0 MTR Tiltable)', icon: '/images/icons/mast-height.svg' },
      light: { title: 'Light', value: '4 x 150W LED (87,000 Lumens)', icon: '/images/icons/led-light.svg' },
      runtime: { title: 'Runtime', value: '10.2+ Hours Battery Backup (7.2 kWh)', icon: '/images/icons/runtime-in-hours.svg' },
      coverage: { title: 'Light coverage', value: '5000 sq. m', icon: '/images/icons/light-coverage.svg' }
    },
    tableSpecs: [
      {
        engine: 'Solar Array: 595W x 4 Modules (2380W Total) Sliding Rail System',
        generator: '5.0 kVA Pure Sine Wave Inverter (230V AC) | MPPT Controller 48V (>=95%)',
        tankSize: 'Battery: LiFePO4 48V 150Ah x 1 (7200Wh / 7.2 kWh Storage)',
        sockets: '4 x 150W Linear Sport Floodlights (87,000 Lumens, 145 lm/W, IP66)',
        weight: '950 - 980 KG',
        dimensions: 'Travel: 2.8-3.2 x 2.0-2.2 x 2.3-2.6 m | Mast: 7.0 m (359° Rotation)'
      }
    ],
    features: [
      '2380W total solar generation via 4 x 595W sliding rail monocrystalline panels (efficiency >=18%)',
      '4 x 150W Linear Sport LED floodlights delivering 87,000 lumens (145 lm/w, IP66)',
      'High-capacity LiFePO4 battery bank: 48V 150Ah (7.2 kWh storage) giving 10.2+ hours backup',
      'Heavy-duty 5.0 kVA pure sine wave inverter (230V AC) and 48V MPPT smart controller (>=95% eff)',
      '7.0-meter galvanized mast with 359° manual rotation and manual mechanism winch (<=5 min)',
      'Road mobile trailer chassis: 13" tyres (2), leaf springs (2), 4 crane hooks, 4 leveling jacks',
      'Optional add-ons: Security camera compatible, USB/C-Ports, Camouflage military paint'
    ],
    highlights: [
      {
        title: 'Electrical & Solar System',
        items: [
          'Inverter Rating: 5.0 kVA Pure Sine Wave, Output: 230V AC',
          'Solar Panels: 595W x 4 Modules (Total Solar Array: 2380W), Sliding rail system',
          'Charge Controller: MPPT 48V, Efficiency >= 95%, Overcharge & Reverse polarity protection',
          'Battery Bank: LiFePO4 48V 150Ah x 1 (Total Storage 7200Wh / 7.2 kWh)',
          'Daily Solar Harvesting: 2380W x 5h = 11,900 Wh/day'
        ]
      },
      {
        title: 'Lighting System',
        items: [
          'LED Flood Lights: 4 Units x 150W each (Total 600W), Linear Sport Flood Light',
          'Luminous Efficacy: 145 lm/W, Total Brightness: 87,000 Lumens, IP66',
          'Illumination Coverage: Up to 5000 sq.m, Light Spread: Around + Long Range, Tilt: 90°'
        ]
      },
      {
        title: 'Tower & Mechanical',
        items: [
          'Height: 7.0 m, Construction: Plated or Hot Dip Galvanized, Rotation: 359°',
          'Wire Rope: Stainless Steel 6mm, Winch Raising & Lowering: <= 5 min max',
          'Tyres: 13" (2 Nos.), Suspension: Leaf Spring x 2, Jacks: 4 Nos., Hooks: 4 Nos.',
          'Dimensions: Length: 2.8-3.2m, Width: 2.0-2.2m, Height: 2.3-2.6m, Weight: 950-980kg'
        ]
      }
    ],
    specSheetData: {
      docRef: 'ALX-TSS-5SLT6000',
      title: 'ACE 5 SLT 6000',
      subtitle: '5.0 kVA Inverter Solar Mobile Lighting Tower - 7.0M Mast',
      sections: [
        {
          category: 'Electrical & Solar System',
          items: [
            { name: 'Inverter & Power Conditioning', value: '5.0 kVA Pure Sine Wave, 230V AC Output (Overload & Short Circuit Protection)' },
            { name: 'Solar Power Generation', value: 'Solar Panels: 595W x 4 Modules (Total Array: 2380W), Sliding Rail System' },
            { name: 'Solar Panel Efficiency', value: '>= 18%' },
            { name: 'Charge Controller', value: 'MPPT 48V, Charge Efficiency >= 95% (Reverse Polarity, Overcharge, Over-Temp Protection)' },
            { name: 'Battery Bank', value: 'LiFePO4 (LFP) 48V, 150Ah x 1 (Total Storage: 7200Wh / 7.2 kWh)' },
            { name: 'Solar Charging & Metrics', value: 'Solar Input: 2380W x 5h = 11900Wh/day | Backup Time: 10.2 Hours Actual Backup' }
          ]
        },
        {
          category: 'Lighting System & Photometrics',
          items: [
            { name: 'LED Flood Lights', value: '04 Units x 150W Each (Total 600W), Linear Sport Flood Light' },
            { name: 'Luminous Efficacy', value: '145 lm/W' },
            { name: 'Total Brightness', value: '87,000 Lumens (150W x 145 lm/w x 4)' },
            { name: 'Ingress Protection', value: 'IP66' },
            { name: 'Light Performance', value: 'Illumination Coverage: Up to 5000 sq.m | Spread: Around + Long Range' },
            { name: 'Tilt Adjustment', value: '90° Manual Tilt' }
          ]
        },
        {
          category: 'Tower & Winch System',
          items: [
            { name: 'Mast Height', value: '7.0 m (Ground Level to Light)' },
            { name: 'Construction', value: 'Plated or Hot Dip Galvanized' },
            { name: 'Rotation', value: '359° Manual' },
            { name: 'Wire Rope', value: 'Stainless Steel, 06 mm (Spiral Cable)' },
            { name: 'Winch Operation', value: 'Manual Mechanism Winch (Raising & Lowering Time: <= 5 min max)' }
          ]
        },
        {
          category: 'Control & Safety Systems',
          items: [
            { name: 'Control Panel', value: 'Weatherproof Compartment' },
            { name: 'Individual Light Control', value: 'Individual Light ON/OFF: 04 Nos.' },
            { name: 'AC Ports', value: 'AC Inlet Available | AC Charging Input Available' },
            { name: 'Safety Protections', value: 'Overload, Short Circuit, Deep Discharge, Surge Protection' }
          ]
        },
        {
          category: 'Mechanical Structure & Mobility',
          items: [
            { name: 'Trailer & Chassis', value: 'Heavy-Duty Steel Construction, Anti-Rust Coating, Canopy Provided' },
            { name: 'Mobility Components', value: 'Tyre: 13" (2 Nos.) | Suspension: Leaf Spring x 2 | Towing Hitch: Adjustable' },
            { name: 'Hooks & Jacks', value: 'Crane Hooks: 4 Nos. | Leveling Jacks: 4 Nos.' },
            { name: 'Dimensions', value: 'Length: 2.8m - 3.2m | Width: 2.0m - 2.2m | Height: 2.3m - 2.6m' },
            { name: 'Gross Weight', value: '950 - 980 kg' },
            { name: 'Optional Upgrades', value: 'Camera Compatible, USB/C-Port, Camouflage Paint' }
          ]
        }
      ]
    },
    variants: ['solar-surveillance-tower', 'ace-3-slt-6000', 'without-genset']
  },

  'ace-3-slt-6000': {
    id: 'ace-3-slt-6000',
    title: 'ACE 3 SLT 6000',
    category: 'solar',
    categoryName: 'Solar Operated',
    tagline: '3.0 KVA Inverter Solar Mobile Light Tower - 7.0M Mast',
    description: 'The ACE 3 SLT 6000 is our heavy-duty zero-fuel, zero-emission solar mobile lighting tower equipped with a 3.0 kVA pure sine wave inverter, 4 sliding solar panels (2380W total), 48V MPPT controller, and 7.2 kWh LiFePO4 battery bank powering 4 LED floodlights (87,000 lumens) on a 7.0-meter 359° rotatable mast.',
    image: '/images/products/Solar Oprated/Solar-Powered Light Tower Trailer.png',
    gallery: [
      '/images/products/Solar Oprated/Solar-Powered Light Tower Trailer.png'
    ],
    featureImage: '/images/features/features-solar-3slt.jpg',
    bestFor: [
      {
        title: 'Eco-Sensitive Infrastructure & Green Construction Sites',
        desc: '100% emission-free, silent lighting compliant with strict environmental city regulations.',
        image: '/images/bestfor/solar-eco-construction.jpg'
      },
      {
        title: 'Remote Off-Grid Mining & Desert Exploration',
        desc: 'Self-sufficient daily solar harvesting eliminates diesel refueling trips in remote desert mines.',
        image: '/images/bestfor/solar-remote-mining.jpg'
      },
      {
        title: 'Zero-Emission Urban Highway & Residential Nightworks',
        desc: 'Zero engine exhaust fumes and silent battery discharge for quiet neighborhood repairs.',
        image: '/images/bestfor/solar-urban-highway.jpg'
      },
      {
        title: 'Solar Parks & Renewable Energy Sub-Stations',
        desc: 'Natural power pairing for utility-scale solar farms, wind parks, and green power grids.',
        image: '/images/bestfor/solar-renewables.jpg'
      }
    ],
    quickSpecs: {
      mastHeight: { title: 'Mast height', value: '23 ft (7.0 MTR Tiltable)', icon: '/images/icons/mast-height.svg' },
      light: { title: 'Light', value: '4 x 150W LED (87,000 Lumens)', icon: '/images/icons/led-light.svg' },
      runtime: { title: 'Runtime', value: '10.2+ Hours Battery Backup (7.2 kWh)', icon: '/images/icons/runtime-in-hours.svg' },
      coverage: { title: 'Light coverage', value: '5000 sq. m', icon: '/images/icons/light-coverage.svg' }
    },
    tableSpecs: [
      {
        engine: 'Solar Array: 595W x 4 Modules (2380W Total) Sliding Rail System',
        generator: '3.0 kVA Pure Sine Wave Inverter (230V AC) | MPPT Controller 48V (>=95%)',
        tankSize: 'Battery: LiFePO4 48V 150Ah x 1 (7200Wh / 7.2 kWh Storage)',
        sockets: '4 x 150W Linear Sport Floodlights (87,000 Lumens, 145 lm/W, IP66)',
        weight: '950 - 980 KG',
        dimensions: 'Travel: 2.8-3.2 x 2.0-2.2 x 2.3-2.6 m | Mast: 7.0 m (359° Rotation)'
      }
    ],
    features: [
      '2380W total solar generation via 4 x 595W sliding rail monocrystalline panels (efficiency >=18%)',
      '4 x 150W Linear Sport LED floodlights delivering 87,000 lumens (145 lm/w, IP66)',
      'High-capacity LiFePO4 battery bank: 48V 150Ah (7.2 kWh storage) giving 10.2+ hours backup',
      'Heavy-duty 3.0 kVA pure sine wave inverter (230V AC) and 48V MPPT smart controller (>=95% eff)',
      '7.0-meter galvanized mast with 359° manual rotation and manual mechanism winch (<=5 min)',
      'Road mobile trailer chassis: 13" tyres (2), leaf springs (2), 4 crane hooks, 4 leveling jacks',
      'Optional add-ons: Security camera compatible, USB/C-Ports, Camouflage military paint'
    ],
    highlights: [
      {
        title: 'Electrical & Solar System',
        items: [
          'Inverter Rating: 3.0 kVA Pure Sine Wave, Output: 230V AC',
          'Solar Panels: 595W x 4 Modules (Total Solar Array: 2380W), Sliding rail system',
          'Charge Controller: MPPT 48V, Efficiency >= 95%, Overcharge & Reverse polarity protection',
          'Battery Bank: LiFePO4 48V 150Ah x 1 (Total Storage 7200Wh / 7.2 kWh)',
          'Daily Solar Harvesting: 2380W x 5h = 11,900 Wh/day'
        ]
      },
      {
        title: 'Lighting System',
        items: [
          'LED Flood Lights: 4 Units x 150W each (Total 600W), Linear Sport Flood Light',
          'Luminous Efficacy: 145 lm/W, Total Brightness: 87,000 Lumens, IP66',
          'Illumination Coverage: Up to 5000 sq.m, Light Spread: Around + Long Range, Tilt: 90°'
        ]
      },
      {
        title: 'Tower & Mechanical',
        items: [
          'Height: 7.0 m, Construction: Plated or Hot Dip Galvanized, Rotation: 359°',
          'Wire Rope: Stainless Steel 6mm, Winch Raising & Lowering: <= 5 min max',
          'Tyres: 13" (2 Nos.), Suspension: Leaf Spring x 2, Jacks: 4 Nos., Hooks: 4 Nos.',
          'Dimensions: Length: 2.8-3.2m, Width: 2.0-2.2m, Height: 2.3-2.6m, Weight: 950-980kg'
        ]
      }
    ],
    specSheetData: {
      docRef: 'ALX-TSS-3SLT6000',
      title: 'ACE 3 SLT 6000',
      subtitle: '3.0 kVA Inverter Solar Mobile Lighting Tower - 7.0M Mast',
      sections: [
        {
          category: 'Electrical & Solar System',
          items: [
            { name: 'Inverter & Power Conditioning', value: '3.0 kVA Pure Sine Wave, 230V AC Output (Overload & Short Circuit Protection)' },
            { name: 'Solar Power Generation', value: 'Solar Panels: 595W x 4 Modules (Total Array: 2380W), Sliding Rail System' },
            { name: 'Solar Panel Efficiency', value: '>= 18%' },
            { name: 'Charge Controller', value: 'MPPT 48V, Charge Efficiency >= 95% (Reverse Polarity, Overcharge, Over-Temp Protection)' },
            { name: 'Battery Bank', value: 'LiFePO4 (LFP) 48V, 150Ah x 1 (Total Storage: 7200Wh / 7.2 kWh)' },
            { name: 'Solar Charging & Metrics', value: 'Solar Input: 2380W x 5h = 11900Wh/day | Backup Time: 10.2 Hours Actual Backup' }
          ]
        },
        {
          category: 'Lighting System & Photometrics',
          items: [
            { name: 'LED Flood Lights', value: '04 Units x 150W Each (Total 600W), Linear Sport Flood Light' },
            { name: 'Luminous Efficacy', value: '145 lm/W' },
            { name: 'Total Brightness', value: '87,000 Lumens (150W x 145 lm/w x 4)' },
            { name: 'Ingress Protection', value: 'IP66' },
            { name: 'Light Performance', value: 'Illumination Coverage: Up to 5000 sq.m | Spread: Around + Long Range' },
            { name: 'Tilt Adjustment', value: '90° Manual Tilt' }
          ]
        },
        {
          category: 'Tower & Winch System',
          items: [
            { name: 'Mast Height', value: '7.0 m (Ground Level to Light)' },
            { name: 'Construction', value: 'Plated or Hot Dip Galvanized' },
            { name: 'Rotation', value: '359° Manual' },
            { name: 'Wire Rope', value: 'Stainless Steel, 06 mm (Spiral Cable)' },
            { name: 'Winch Operation', value: 'Manual Mechanism Winch (Raising & Lowering Time: <= 5 min max)' }
          ]
        },
        {
          category: 'Control & Safety Systems',
          items: [
            { name: 'Control Panel', value: 'Weatherproof Compartment' },
            { name: 'Individual Light Control', value: 'Individual Light ON/OFF: 04 Nos.' },
            { name: 'AC Ports', value: 'AC Inlet Available | AC Charging Input Available' },
            { name: 'Safety Protections', value: 'Overload, Short Circuit, Deep Discharge, Surge Protection' }
          ]
        },
        {
          category: 'Mechanical Structure & Mobility',
          items: [
            { name: 'Trailer & Chassis', value: 'Heavy-Duty Steel Construction, Anti-Rust Coating, Canopy Provided' },
            { name: 'Mobility Components', value: 'Tyre: 13" (2 Nos.) | Suspension: Leaf Spring x 2 | Towing Hitch: Adjustable' },
            { name: 'Hooks & Jacks', value: 'Crane Hooks: 4 Nos. | Leveling Jacks: 4 Nos.' },
            { name: 'Dimensions', value: 'Length: 2.8m - 3.2m | Width: 2.0m - 2.2m | Height: 2.3m - 2.6m' },
            { name: 'Gross Weight', value: '950 - 980 kg' },
            { name: 'Optional Upgrades', value: 'Camera Compatible, USB/C-Port, Camouflage Paint' }
          ]
        }
      ]
    },
    variants: ['solar-surveillance-tower', 'ace-5-slt-6000', 'ace-lt-12000']
  },

  'solar-surveillance-tower': {
    id: 'solar-surveillance-tower',
    title: 'Solar Powered Surveillance & Light Tower',
    category: 'solar',
    categoryName: 'Solar Operated',
    tagline: 'Clean Energy 24x7 Smart Surveillance & Mobile Lighting Tower',
    description: 'The Ariselux Solar Powered Surveillance & Light Tower is a compact, mobile and reliable solution designed for continuous surveillance and lighting in remote and critical locations. Powered by clean solar energy (3 x 300W panels) with 4 x 200Ah/150Ah gel batteries, 1 x 2MP PTZ camera and 3 x 3MP bullet cameras.',
    image: '/images/products/Solar Oprated/solar new 1.png',
    gallery: [
      '/images/products/Solar Oprated/solar new 1.png',
      '/images/products/Solar Oprated/solar new 2.png',
      '/images/products/Solar Oprated/Solar new 3.png'
    ],
    featureImage: '/images/features/features-solar-surveillance.jpg',
    bestFor: [
      {
        title: 'Road Traffic & Highway Safety Monitoring',
        desc: 'Continuous real-time speed, perimeter, and traffic safety observation with 360° PTZ coverage.'
      },
      {
        title: 'Orchard, Agriculture & Remote Farm Security',
        desc: '100% emission-free off-grid perimeter protection and night surveillance for remote agricultural land.'
      },
      {
        title: 'Commercial Parking Lots & Logistics Yards',
        desc: 'Round-the-clock security recording with 8-channel NVR and motion tracking in open commercial lots.'
      },
      {
        title: 'Port Terminals & Marine Freight Operations',
        desc: 'Heavy-duty sandblasted and powder-coated trailer built to withstand harsh coastal weather and monitor shipping.'
      }
    ],
    quickSpecs: {
      mastHeight: { title: 'Mast height', value: '20 - 30 ft (6.0 - 9.0 MTR)', icon: '/images/icons/mast-height.svg' },
      light: { title: 'Solar Array', value: '3 x 300W High Efficiency (900W)', icon: '/images/icons/led-light.svg' },
      runtime: { title: 'Battery Bank', value: '4 x 200Ah / 150Ah Gel (DC24V)', icon: '/images/icons/runtime-in-hours.svg' },
      coverage: { title: 'Surveillance', value: '1 x PTZ + 3 x Bullet (360°)', icon: '/images/icons/light-coverage.svg' }
    },
    tableSpecs: [
      {
        engine: 'Solar Array: 3 x 300W High Efficiency Solar Panels (900W Total)',
        generator: 'Battery System: 4 x 200Ah / 4 x 150Ah Gel Batteries (DC24V System)',
        tankSize: 'Cameras: 1 x 2MP PTZ (16x Zoom, IR 100m) + 3 x 3MP Bullet (IR 50m)',
        sockets: 'NVR: 8-ch, 2 x 3TB HDDs | Industrial POE Switch | Optional 4G Router',
        weight: 'Approx 500 KG (Single Axle Trailer, 15" Wheels)',
        dimensions: 'Length: 2600 mm | Width: 1470 mm | Height: 2810 mm\nMast: 6 to 9 m (Manual / Electric / Hydraulic) | Wind Rating: 100 km/h'
      }
    ],
    features: [
      '3 x 300W high-efficiency monocrystalline solar panels with tilting mechanism',
      '4 x 200Ah / 4 x 150Ah deep-cycle gel batteries in a robust DC24V system',
      '1 x 2MP PTZ network camera with 16x optical zoom, IR 100m, and 360° view',
      '3 x 3MP HD bullet cameras providing 50m infrared night vision coverage',
      'Commercial 8-channel NVR with 2 x 3TB HDDs and industrial-grade POE switch',
      '6.0 to 9.0-meter telescopic mast tested to 100 km/h wind rating speed',
      'Single-axle trailer chassis with 15" wheels, 4 manual stabilizer jacks, and 50mm ball hitch'
    ],
    highlights: [
      {
        title: 'Solar Power Generation & Energy Storage',
        items: [
          '3 x 300W high-efficiency solar panels for continuous daily charging',
          'Heavy-duty DC24V power architecture with 4 x 200Ah / 150Ah gel batteries',
          'Zero fuel cost, zero emissions, and silent operation in remote locations'
        ]
      },
      {
        title: 'Professional Smart Surveillance Array',
        items: [
          'High-precision 2MP PTZ camera with 16x optical zoom and 100m infrared range',
          '3 wide-angle 3MP bullet cameras for comprehensive 360-degree perimeter coverage',
          'Industrial POE switch and 8-channel NVR equipped with dual 3TB hard drives'
        ]
      }
    ],
    specSheetData: {
      docRef: 'ALX-TSS-SOLAR-SURV',
      title: 'Solar Powered Surveillance & Light Tower',
      subtitle: 'Clean Energy 24x7 Smart Surveillance & Mobile Lighting Tower',
      sections: [
        {
          category: 'Solar Power Generation & Battery Bank',
          items: [
            { name: 'Solar Panels', value: '3 x 300W High-Efficiency Monocrystalline Panels (900W Total Array)' },
            { name: 'Battery System', value: '4 x 200Ah / 4 x 150Ah Gel Deep-Cycle Batteries (DC24V System)' },
            { name: 'Solar Charge Controller', value: 'Smart MPPT Controller with Overcharge & Low Voltage Disconnect' }
          ]
        },
        {
          category: 'Surveillance & Camera Array',
          items: [
            { name: 'PTZ Network Camera', value: '1 x 2MP High-Speed PTZ Dome (16x Optical Zoom, IR 100m, 360° Continuous Pan)' },
            { name: 'Bullet Perimeter Cameras', value: '3 x 3MP Wide-Angle HD Bullet Cameras (IR 50m Night Vision)' },
            { name: 'Video Storage (NVR)', value: '8-Channel Industrial NVR with 2 x 3TB Hard Drives' },
            { name: 'Networking & Connectivity', value: 'Industrial POE Switch | Optional 4G LTE Wireless Router' }
          ]
        },
        {
          category: 'Mast & Mechanical Structure',
          items: [
            { name: 'Mast Height', value: '6.0 to 9.0 Meters (Manual / Electric / Hydraulic Options)' },
            { name: 'Wind Rating', value: '100 km/h Tested Stability' },
            { name: 'Trailer Chassis', value: 'Single-Axle Trailer with 15" Wheels & 4 Stabilizer Jacks' },
            { name: 'Gross Weight', value: 'Approx. 500 kg' },
            { name: 'Overall Dimensions', value: '2600 mm (L) x 1470 mm (W) x 2810 mm (H)' }
          ]
        }
      ]
    },
    variants: ['ace-5-slt-6000', 'ace-3-slt-6000']
  },

  // ── 6. BATTERY OPERATED ───────────────────────────────────────────
  'ace-b-04': {
    id: 'ace-b-04',
    title: 'ACE B -04',
    category: 'battery',
    categoryName: 'Battery Operated',
    tagline: 'Tactical 4-Light Lithium Portable Light Tower - 2.0M Mast',
    description: 'The ACE B -04 is a rugged tactical battery-operated mobile light tower. Equipped with a 100AH 12V Lithium battery bank, it powers 4 x 50W high-power cool white LED lights delivering 20,000 to 28,000 lumens. Features a 2.0-meter telescopic MS rod tower, waterproof ABS black body, and 3-mode dimmer (HIGH-LOW-MEDIUM) with 6-8 hours backup.',
    image: '/images/products/Battery oprated/ACE B004(1).png',
    gallery: [
      '/images/products/Battery oprated/ACE B004(1).png',
      '/images/products/Battery oprated/ACE B004(2).png'
    ],
    featureImage: '/images/features/features-b04.jpg',
    bestFor: [
      {
        title: 'Underground Metro & Tunnel Maintenance (Zero Fumes)',
        desc: '100% emission-free battery operation safe for confined underground railway tunnels.',
        image: '/images/bestfor/battery-tunnel.jpg'
      },
      {
        title: 'Tactical Night Inspection & Emergency Vehicle Breakdown',
        desc: 'Instant grab-and-go quad LED floodlight deployment for roadside highway emergencies.',
        image: '/images/bestfor/battery-inspection.jpg'
      },
      {
        title: 'Confined Space & Indoor Industrial Plants',
        desc: 'Zero noise and zero fuel risk for pharmaceutical, food processing, and chemical factories.',
        image: '/images/bestfor/battery-plant.jpg'
      },
      {
        title: 'Rapid Roadside Trench & Water Pipeline Repairs',
        desc: 'Portable Pelican suitcase trolley with wheels for easy one-man maneuverability.',
        image: '/images/bestfor/battery-trench.jpg'
      }
    ],
    quickSpecs: {
      mastHeight: { title: 'Tower height', value: '6.5 ft (2.0 MTR Telescopic)', icon: '/images/icons/mast-height.svg' },
      light: { title: 'Light', value: '4 x 50W LED (28,000 Lumens)', icon: '/images/icons/led-light.svg' },
      runtime: { title: 'Runtime', value: '6 - 8 Hours (100AH Lithium)', icon: '/images/icons/runtime-in-hours.svg' },
      coverage: { title: 'Light coverage', value: '2500 sq. m', icon: '/images/icons/light-coverage.svg' }
    },
    tableSpecs: [
      {
        engine: '100AH X 1 (Lithium) 12V Battery Capacity',
        generator: 'Battery Charger Included (4-5 Hours Fast Charging)',
        tankSize: '6 - 8 Hrs Backup (According to Brightness on Medium Mode)',
        sockets: 'Dimmer: HIGH-LOW-MEDIUM | 50W X 4 nos. (High Power LED)',
        weight: '25 Kg Approx. (ABS Black Plastic Body | Waterproof: Yes)',
        dimensions: 'Tower Height: 2 Meter +- 10 cm | Extension: 2 Min | Closing: 2 Min'
      }
    ],
    features: [
      'Battery Capacity: 100AH X 1 (Lithium), 12V with included 4-5 hours battery charger',
      'Brightness: 20,000 - 28,000 lumens from 4 x 50W High Power Cool White LEDs',
      'Extended 6-8 hours continuous backup time on medium mode with 3-mode dimmer (HIGH-LOW-MEDIUM)',
      'Telescopic MS Rod tower extending to 2 Meter (+/- 10 cm) in 2 minutes',
      'Manual step up and step down method with 2-minute closing time',
      'Ultra-portable 25 kg approx weight with waterproof tactical ABS black plastic casing',
      '12-month manufacturer warranty'
    ],
    highlights: [
      {
        title: 'Battery & Power',
        items: [
          'Battery Capacity: 100AH X 1 (Lithium), Battery volt: 12 v',
          'Battery Charger: Yes, Battery Charging: 4-5 Hours',
          'Back up: Approx. 6-8 Hrs (According to Brightness on Medium Mode)'
        ]
      },
      {
        title: 'Lighting System',
        items: [
          'Light Source: LED Type Cool White, Light power: 50 W X 4 nos. (High Power LED)',
          'Brightness: 20000 - 28000 lumens',
          'Dimmer: HIGH-LOW-MEDIUM'
        ]
      },
      {
        title: 'Tower Assembly & Build',
        items: [
          'Tower: Telescopic MS Rod, Tower Height: 2 Meter +- 10 cm',
          'Time for Tower extension: 2 Min, Closing: 2 Min, Method: Manual',
          'Material Type: ABS Black, Body Material: Plastic, Waterproof: Yes',
          'Weight: 25 Kg Approx., Warranty: 12 Month'
        ]
      }
    ],
    specSheetData: {
      docRef: 'ALX-TSS-B04',
      title: 'ACE B -04',
      subtitle: 'Tactical Portable Lithium Light Tower - 2.0M Telescopic Mast',
      sections: [
        {
          category: 'Battery & Power System',
          items: [
            { name: 'Battery Capacity', value: '100AH X 1 (Lithium)' },
            { name: 'Battery Voltage', value: '12 V' },
            { name: 'Battery Charger', value: 'Yes (Included)' },
            { name: 'Battery Charging Time', value: '4-5 Hours' },
            { name: 'Back Up Time', value: 'Approx. 6-8 Hrs (According to Brightness on Medium Mode)' }
          ]
        },
        {
          category: 'Lighting System & Optics',
          items: [
            { name: 'Light Source', value: 'LED Type Cool White' },
            { name: 'Light Power', value: '50 W X 4 nos. (High Power LED - 200W Total)' },
            { name: 'Brightness', value: '20,000 - 28,000 Lumens' },
            { name: 'Dimmer Settings', value: 'HIGH - LOW - MEDIUM' }
          ]
        },
        {
          category: 'Tower & Elevation Assembly',
          items: [
            { name: 'Tower Type', value: 'Telescopic MS Rod' },
            { name: 'Tower Height', value: '2 Meter +/- 10 cm' },
            { name: 'Time for Tower Extension', value: '2 Min' },
            { name: 'Time for Tower Closing', value: '2 Min' },
            { name: 'Method of Step Up & Down', value: 'Manual' }
          ]
        },
        {
          category: 'Physical Construction & Build',
          items: [
            { name: 'Material Type', value: 'ABS Black' },
            { name: 'Body Material', value: 'Heavy-Duty Industrial Plastic' },
            { name: 'Waterproof Rating', value: 'Yes (Weatherproof Sealed Case)' },
            { name: 'Weight', value: '25 Kg Approx.' },
            { name: 'Warranty', value: '12 Month' }
          ]
        }
      ]
    },
    variants: ['ace-b-02', 'ace-b-01', 'ace-1-2-it-4500']
  },

  'ace-b-02': {
    id: 'ace-b-02',
    title: 'ACE B -02',
    category: 'battery',
    categoryName: 'Battery Operated',
    tagline: 'Dual-Light Portable Lithium Battery Tower - 102CM Mast',
    description: 'The ACE B -02 is an ultra-portable twin-head tactical battery lighting tower. Featuring a 75AH 12V Lithium battery, it drives 2 x 50W high-power cool white LEDs delivering 10,000 lumens. Features a 102cm expandable telescopic MS rod, 4-mode dimmer (Low-Medium-High-SOS), ABS black housing, and 6-7 hours backup.',
    image: '/images/products/Battery oprated/ACE B002(1).png',
    gallery: [
      '/images/products/Battery oprated/ACE B002(1).png',
      '/images/products/Battery oprated/ACE B002(2).png'
    ],
    featureImage: '/images/features/features-b02.jpg',
    bestFor: [
      {
        title: 'Tactical Night Inspection & Emergency Vehicle Breakdown',
        desc: 'Instant grab-and-go twin LED floodlight deployment for roadside highway emergencies.',
        image: '/images/bestfor/battery-inspection.jpg'
      },
      {
        title: 'Underground Metro & Tunnel Maintenance (Zero Fumes)',
        desc: '100% emission-free battery operation safe for confined underground railway tunnels.',
        image: '/images/bestfor/battery-tunnel.jpg'
      },
      {
        title: 'Confined Space & Indoor Industrial Plants',
        desc: 'Zero noise and zero fuel risk for pharmaceutical, food processing, and chemical factories.',
        image: '/images/bestfor/battery-plant.jpg'
      },
      {
        title: 'Rapid Roadside Trench & Water Pipeline Repairs',
        desc: 'Portable Pelican suitcase trolley with wheels for easy one-man maneuverability.',
        image: '/images/bestfor/battery-trench.jpg'
      }
    ],
    quickSpecs: {
      mastHeight: { title: 'Tower height', value: '3.3 ft (102 cm Telescopic)', icon: '/images/icons/mast-height.svg' },
      light: { title: 'Light', value: '2 x 50W LED (10,000 Lumens)', icon: '/images/icons/led-light.svg' },
      runtime: { title: 'Runtime', value: '6 - 7 Hours (75AH Lithium)', icon: '/images/icons/runtime-in-hours.svg' },
      coverage: { title: 'Light coverage', value: '1200 sq. m', icon: '/images/icons/light-coverage.svg' }
    },
    tableSpecs: [
      {
        engine: '75AH X 1 (Lithium) 12V Battery Capacity',
        generator: 'Battery Charger Included (5 Hours Charging Time)',
        tankSize: 'Approx. 6-7 Hrs Backup (Medium Mode)',
        sockets: 'Dimmer: Low-Medium-High-SOS | 50W X 2 nos. High Power LED',
        weight: '20 Kg Approx. (ABS Black Plastic Body)',
        dimensions: 'Expandable 102cm +- 10 cm | Extension: 60 sec | Closing: 2 Min'
      }
    ],
    features: [
      'Battery Capacity: 75AH X 1 (Lithium), 12V with included 5-hour battery charger',
      'Brightness: 10,000 lumens from 2 x 50W High Power Cool White LEDs (100W Total)',
      '6-7 hours continuous backup time on medium mode with 4-mode dimmer (Low-Medium-High-SOS)',
      'Telescopic MS Rod tower extending to 102cm (+/- 10 cm) in just 60 seconds',
      'Step up & step down manual mechanism with 2-minute closing time',
      'Lightweight 20 kg approx weight with rugged ABS black plastic housing',
      '12-month manufacturer warranty'
    ],
    highlights: [
      {
        title: 'Battery & Power',
        items: [
          'Battery Capacity: 75AH X 1 (Lithium), Battery volt: 12 v',
          'Battery Charger: Yes, Battery Charging: 5 Hours',
          'Back up: Approx. 6-7 Hrs (According to Brightness on Medium Mode)'
        ]
      },
      {
        title: 'Lighting System',
        items: [
          'Light Source: LED Type Cool White, Light power: 50 W X 2 nos. (High Power LED)',
          'Brightness: 10000 lumens',
          'Dimmer: Low-Medium-High-SOS'
        ]
      },
      {
        title: 'Tower Assembly & Build',
        items: [
          'Tower: Telescopic MS Rod, Tower Height: Expendable 102cm +- 10 cm',
          'Time for Tower extension: 60 sec, Closing: 2 Min, Method: Manual',
          'Material Type: ABS Black, Body Material: Plastic',
          'Weight: 20 Kg Approx., Warranty: 12 Month'
        ]
      }
    ],
    specSheetData: {
      docRef: 'ALX-TSS-B02',
      title: 'ACE B -02',
      subtitle: 'Dual-Light Portable Lithium Battery Tower - 102CM Mast',
      sections: [
        {
          category: 'Battery & Power System',
          items: [
            { name: 'Battery Capacity', value: '75AH X 1 (Lithium)' },
            { name: 'Battery Voltage', value: '12 V' },
            { name: 'Battery Charger', value: 'Yes (Included)' },
            { name: 'Battery Charging Time', value: '5 Hours' },
            { name: 'Back Up Time', value: 'Approx. 6-7 Hrs (According to Brightness on Medium Mode)' }
          ]
        },
        {
          category: 'Lighting System & Optics',
          items: [
            { name: 'Light Source', value: 'LED Type Cool White' },
            { name: 'Light Power', value: '50 W X 2 nos. (High Power LED - 100W Total)' },
            { name: 'Brightness', value: '10,000 Lumens' },
            { name: 'Dimmer Settings', value: 'Low - Medium - High - SOS' }
          ]
        },
        {
          category: 'Tower & Elevation Assembly',
          items: [
            { name: 'Tower Type', value: 'Telescopic MS Rod' },
            { name: 'Tower Height', value: 'Expendable 102 cm +/- 10 cm' },
            { name: 'Time for Tower Extension', value: '60 Seconds' },
            { name: 'Time for Tower Closing', value: '2 Minutes' },
            { name: 'Method of Step Up & Down', value: 'Manual' }
          ]
        },
        {
          category: 'Physical Construction & Build',
          items: [
            { name: 'Material Type', value: 'ABS Black' },
            { name: 'Body Material', value: 'Heavy-Duty Industrial Plastic' },
            { name: 'Weight', value: '20 Kg Approx.' },
            { name: 'Warranty', value: '12 Month' }
          ]
        }
      ]
    },
    variants: ['ace-b-04', 'ace-b-01', 'ace-plt-4000']
  },

  'ace-b-01': {
    id: 'ace-b-01',
    title: 'ACE B -01',
    category: 'battery',
    categoryName: 'Battery Operated',
    tagline: 'Ultra-Compact 5,000 Lumens Portable Light Tower',
    description: 'The ACE B -01 is an ultra-compact single-head portable lithium light tower providing 5,000 lumens from a 50W LED fixture. Delivers 8-9 hours battery backup in an ultra-lightweight 12 kg tactical carry case with 1.0-1.5 meter telescopic mast.',
    image: '/images/products/Battery oprated/ACE B001(2).png',
    gallery: [
      '/images/products/Battery oprated/ACE B001(2).png',
      '/images/products/Battery oprated/ACE B001 (1).png',
      '/images/products/Battery oprated/ACE B001(3).png'
    ],
    featureImage: '/images/features/features-b01.jpg',
    bestFor: [
      {
        title: 'Rapid Roadside Trench & Water Pipeline Repairs',
        desc: 'Ultra-compact 12 kg carry system for fast municipal pipeline inspections.',
        image: '/images/bestfor/battery-trench.jpg'
      },
      {
        title: 'Tactical Night Inspection & Emergency Vehicle Breakdown',
        desc: 'Single high-power 50W LED fixture for immediate targeted work zone lighting.',
        image: '/images/bestfor/battery-inspection.jpg'
      },
      {
        title: 'Underground Metro & Tunnel Maintenance (Zero Fumes)',
        desc: 'Hand-portable suitcase light tower that fits into tight manholes and shafts.',
        image: '/images/bestfor/battery-tunnel.jpg'
      },
      {
        title: 'Confined Space & Indoor Industrial Plants',
        desc: '8-9 hours of clean, silent battery illumination for indoor electrical rooms.',
        image: '/images/bestfor/battery-plant.jpg'
      }
    ],
    quickSpecs: {
      mastHeight: { title: 'Tower height', value: '5 ft (1.0 - 1.5 MTR)', icon: '/images/icons/mast-height.svg' },
      light: { title: 'Light', value: '1 x 50W LED (5,000 Lumens)', icon: '/images/icons/led-light.svg' },
      runtime: { title: 'Runtime', value: '8 - 9 Hours Battery Backup', icon: '/images/icons/runtime-in-hours.svg' },
      coverage: { title: 'Light coverage', value: '800 sq. m', icon: '/images/icons/light-coverage.svg' }
    },
    tableSpecs: [
      {
        engine: 'Rechargeable 12 Volts Battery System',
        generator: 'Solid-State Battery Circuit with Protection',
        tankSize: '8 - 9 Hours Battery Backup',
        sockets: '50 W Light Power | Brightness: 5000 Lumens',
        weight: '12 KG Approx Weight (Compact Tactical Case)',
        dimensions: 'Tower Height: 1 - 1.5 Meter Telescopic MS Rod Tower\nTravel: 0.45 x 0.3 x 0.5 m | Operation: 0.6 x 0.6 x 1.5 m'
      }
    ],
    features: [
      '5,000 lumens brightness from high-output 50W LED fixture',
      'Extended 8 to 9 hours of battery backup time',
      'Rechargeable 12 Volts battery system',
      '1 to 1.5-meter telescopic MS rod tower',
      'Ultra-compact 12 kg approximate weight, easily carried with one hand',
      'Heavy-duty tactical case enclosure with integrated carry handle'
    ],
    highlights: [
      {
        title: 'Grab-and-Go Portability',
        items: [
          'Ultra-compact form factor fits easily in vehicle footwells or small toolboxes',
          'Instant one-switch illumination for night patrol, security, and quick repairs'
        ]
      }
    ],
    specSheetData: {
      docRef: 'ALX-TSS-B01',
      title: 'ACE B -01',
      subtitle: 'Ultra-Compact Portable Lithium Light Tower',
      sections: [
        {
          category: 'Battery & Electrical System',
          items: [
            { name: 'Battery System', value: 'Rechargeable 12V High-Density Lithium Bank' },
            { name: 'Backup Runtime', value: '8 to 9 Hours Continuous' },
            { name: 'Charger', value: 'Included 220V AC Smart Charger' }
          ]
        },
        {
          category: 'Lighting System',
          items: [
            { name: 'Luminaires', value: '1 x 50W High-Efficiency LED' },
            { name: 'Total Brightness', value: '5,000 Lumens' },
            { name: 'Color Temperature', value: 'Cool White Daylight' },
            { name: 'Coverage Area', value: 'Up to 800 sq. meters' }
          ]
        },
        {
          category: 'Tower & Portability',
          items: [
            { name: 'Mast Height', value: '1.0 to 1.5 Meters Telescopic MS Rod' },
            { name: 'Weight', value: 'Approx. 12 kg (One-Hand Carry)' },
            { name: 'Enclosure', value: 'Impact-Resistant Tactical Plastic Case with Handle' }
          ]
        }
      ]
    },
    variants: ['ace-b-02', 'ace-b-04', 'ace-1-2-it-4500']
  },

  // Legacy alias for qube-power-max
  'qube-power-max': {
    id: 'qube-power-max',
    title: 'ACE LT 12000 (Qube Power Max)',
    category: 'diesel',
    categoryName: 'Diesel Powered',
    tagline: 'Heavy-Duty Industrial Diesel Lighting Tower - 12.0M Mast',
    description: 'Ariselux Equipment Company proudly presents its advanced LED Flood Light solution - engineered for maximum brightness, energy efficiency, and durability. Powered by an Escorts Kubota diesel engine and 12-meter mast delivering 240,000 lumens.',
    image: '/images/products/Diesel oprated/ACE LT 12000 -1.png',
    gallery: [
      '/images/products/Diesel oprated/ACE LT 12000 -1.png',
      '/images/products/Diesel oprated/ACE LT 12000 -2.png',
      '/images/products/Diesel oprated/ACE LT 12000 -3.png'
    ],
    featureImage: '/images/features/features-diesel-12000.jpg',
    bestFor: [
      {
        title: 'Open-Cast Mining & Heavy Quarrying',
        desc: 'Deep open pit excavation, mineral extraction, and haul road illumination.',
        image: '/images/bestfor/diesel-mining.jpg'
      },
      {
        title: 'National Highway & Expressway Night Paving',
        desc: 'Continuous asphalt paving, road roller compaction, and worker safety.',
        image: '/images/bestfor/diesel-highway.jpg'
      },
      {
        title: 'Bridge & Heavy Civil Infrastructure Engineering',
        desc: 'Pier construction, concrete foundation pours, and crane operations.',
        image: '/images/bestfor/diesel-bridge.jpg'
      },
      {
        title: 'Mega Industrial Plants & Port Logistics',
        desc: '24/7 dry docks, freight container yards, and industrial manufacturing.',
        image: '/images/bestfor/diesel-ports.jpg'
      }
    ],
    quickSpecs: {
      mastHeight: { title: 'Mast height', value: '39 ft (12 m)', icon: '/images/icons/mast-height.svg' },
      light: { title: 'Light', value: '4 x 420W / 500W LED', icon: '/images/icons/led-light.svg' },
      runtime: { title: 'Runtime', value: '80+ hours', icon: '/images/icons/runtime-in-hours.svg' },
      coverage: { title: 'Light coverage', value: '8000 sq. m', icon: '/images/icons/light-coverage.svg' }
    },
    tableSpecs: [
      {
        engine: 'Escorts Kubota 14.5 HP Water-Cooled Diesel',
        generator: '220 Volts Connection Board Output',
        tankSize: '100 Liters (Diesel)',
        sockets: 'Weatherproof Output Sockets',
        weight: '700 KG',
        dimensions: 'Travel: 2.3 x 1.4 x 2.4 m\nOperation: 2.6 x 2.4 x 12.0 m'
      }
    ],
    features: [
      '240,000 lumens total brightness',
      'Japanese Escorts Kubota 14.5 HP engine',
      '12-meter telescopic mast'
    ],
    highlights: [
      {
        title: 'Lights',
        items: ['High-efficacy modular LED floodlights delivering up to 2,40,000 lumens']
      }
    ],
    specSheetData: {
      docRef: 'ALX-TSS-LT12000-QUBE',
      title: 'ACE LT 12000 (Qube Power Max)',
      subtitle: 'Heavy-Duty Industrial Diesel Lighting Tower',
      sections: [
        {
          category: 'Engine & Output',
          items: [
            { name: 'Engine', value: 'Escorts Kubota 14.5 HP Water-Cooled Diesel' },
            { name: 'Operating Speed', value: '1500 RPM' },
            { name: 'Tank Capacity', value: '100 Liters (80+ Hours Runtime)' },
            { name: 'Luminaires', value: '4 x 300W-500W LED (240,000 Lumens)' },
            { name: 'Mast Height', value: '12.0 Meters (39 ft)' }
          ]
        }
      ]
    },
    variants: ['ace-lt-12000', 'ace-lt-9000', 'ace-lt-6000']
  }
};

// Backward compatibility aliases
productsData['ace-2-slt-6000'] = productsData['ace-5-slt-6000'];
productsData['ace-1-3-slt-6000'] = productsData['ace-3-slt-6000'];
productsData['ace-0-5-slt-4000'] = productsData['ace-3-slt-6000'];


export const products = Object.values(productsData);

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'battery', name: 'Battery Powered' },
  { id: 'diesel', name: 'Diesel Powered' },
  { id: 'solar', name: 'Solar Powered' },
  { id: 'without-genset', name: 'Without Genset' },
  { id: 'petrol', name: 'Petrol Powered' },
  { id: 'hybrid', name: 'Battery-Petrol Hybrid' },
  { id: 'inflatable', name: 'Inflatable Tower' }
];
