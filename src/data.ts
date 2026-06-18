import { Doctor, Department, Service, RehabMilestone, Testimonial } from './types';

const docDinesh = new URL('./assets/images/doc_dinesh_1781790209187.jpg', import.meta.url).href;
const docAnantha = new URL('./assets/images/doc_anantha_1781790225195.jpg', import.meta.url).href;
const docNagendra = new URL('./assets/images/doc_nagendra_1781790239492.jpg', import.meta.url).href;
const docPurna = new URL('./assets/images/doc_purna_1781790254019.jpg', import.meta.url).href;
const docPradeep = new URL('./assets/images/doc_pradeep_1781790268311.jpg', import.meta.url).href;
const docMahesh = new URL('./assets/images/doc_mahesh_1781790280907.jpg', import.meta.url).href;
const docShyam = new URL('./assets/images/doc_shyam_1781790293564.jpg', import.meta.url).href;
const docAjay = new URL('./assets/images/doc_ajay_1781790308295.jpg', import.meta.url).href;

export const DOCTORS: Doctor[] = [
  {
    id: 'dinesh-kumar-reddy',
    name: 'Dr. M. Dinesh Kumar Reddy',
    qualification: 'MPT (Ortho), M.S. (Psychotherapy), LLB, Ph.D.',
    role: 'Orthopaedic & Neuro Rehabilitation Specialist',
    fellowship: 'Fellowship in Ortho & Neuro Rehabilitation (Apollo)',
    experience: 'Ex-Orthopedic Physical Therapist - SVIMS & BIRRD Hospital',
    specialty: 'Ortho & Neuro Rehabilitation',
    bio: 'Renowned expert in comprehensive ortho and neuro recovery. Member of Bar Council of India & A.P. High Court, combining scientific expertise with compassionate care programs.',
    imageUrl: docDinesh
  },
  {
    id: 'anthony-kirankumar',
    name: 'Dr. V. Anantha Kiran Kumar',
    qualification: 'MBBS, MS (General Surgery), MCh (Neurosurgery)',
    role: 'Consultant Neurosurgeon',
    fellowship: 'Fellowship in Neuro Endoscopy',
    specialty: 'Neurosurgery',
    bio: 'Highly trained micro-neurosurgical specialist with advanced fellowship in minimally invasive Neuro Endoscopy. Dedicated to precision neurosurgeries.',
    imageUrl: docAnantha
  },
  {
    id: 'hari-nagendra',
    name: 'Dr. A. Hari Nagendra',
    qualification: 'M.B.B.S., M.D. (Pulmonary Medicine)',
    role: 'Pulmonary Medicine Specialist',
    specialty: 'Pulmonary Medicine',
    bio: 'Distinguished Lungs and Pulmonary health physician, guiding advanced interventions for asthma, COPD, sleep apneas, and general chest disorders.',
    imageUrl: docNagendra
  },
  {
    id: 'purna-chandra-rao',
    name: 'Dr. N. Purna Chandra Rao',
    qualification: 'MBBS, MS (Ortho), MRCS (London)',
    role: 'Consultant Orthopedic Surgeon',
    specialty: 'Orthopaedics',
    bio: 'Global orthopaedics veteran credentialed with Royal College of Surgeons (London). Expert in joint reconstructions, complex trauma, and corrective procedures.',
    imageUrl: docPurna
  },
  {
    id: 'pradeep-reddy',
    name: 'Dr. V. Pradeep Reddy',
    qualification: 'MD General Medicine (Manipal), DM Neurology (MMC, Chennai)',
    role: 'Consultant Neurologist',
    specialty: 'Neurology',
    bio: 'Experienced clinical neurologist with rich clinical credentials from Madras Medical College. Dedicated to comprehensive stroke, epilepsy, and neuropathy management.',
    imageUrl: docPradeep
  },
  {
    id: 'mahesh-reddy',
    name: 'Dr. G. Mahesh Reddy',
    qualification: 'MBBS, MD, DNB (Cardiology)',
    role: 'Consultant Interventional Cardiologist',
    specialty: 'Cardiology',
    bio: 'Dynamic cardiovascular specialist with mastery in key cardiac diagnoses, preventive therapies, and cardiac rehabilitation supervision.',
    imageUrl: docMahesh
  },
  {
    id: 'shyam-sundar',
    name: 'Dr. T. Shyam Sundar',
    qualification: 'MBBS, MS, MCh (Urology)',
    role: 'Consultant Urologist & Andrologist',
    specialty: 'Urology',
    bio: 'Specialist in reconstructive urology, advanced laparoscopic surgeries, and-andrology, with premier clinical training in advanced urosurgery.',
    imageUrl: docShyam
  },
  {
    id: 'ajay-babu',
    name: 'Dr. K. Ajay Babu',
    qualification: 'MBBS, MS (General Surgery)',
    role: 'Consultant General & Laparoscopic Surgeon',
    specialty: 'General Surgery',
    bio: 'Dedicated abdominal surgeon with extensive background in state-of-the-art keyhole and standard operations, patient recovery focus.',
    imageUrl: docAjay
  }
];

export const DEPARTMENTS: Department[] = [
  {
    id: 'ortho-trauma',
    name: 'Orthopaedics & Polytrauma',
    iconName: 'Bone',
    description: 'Expert fracture care, complex trauma reduction, joint reconstructive surgeries, and arthritic management.',
    symptoms: ['Severe Joint Pain', 'Bone Fractures', 'Sports Injury', 'Stiff joints', 'Post-injury instability'],
    features: ['24/7 Fracture Fixation', 'Arthritic Care & Pain Panels', 'Ligament Reconstruction', 'Polytrauma Emergency Response']
  },
  {
    id: 'neuro-rehab',
    name: 'Neuro Rehabilitation',
    iconName: 'Accessibility',
    description: 'Sri Jhansi Specialised Rehab. Complete neural re-learning post stroke, spinal injury, and paralysis.',
    symptoms: ['Loss of balance', 'Limb weakness Post-Stroke', 'Motor-skill lag', 'Paralysis', 'Neuropathy stiffness'],
    features: ['State-of-the-Art Gym Care', 'Cognitive Neurological Therapy', 'Gait Analysis & Posture Correction', 'Experienced Physio Team']
  },
  {
    id: 'neurology',
    name: 'Neurology',
    iconName: 'BrainCircuit',
    description: 'Diagnosis and non-surgical therapy for complex brain disorders, headaches, Parkinson\'s, epilepsy, and neuropathies.',
    symptoms: ['Frequent Migraines', 'Seizures/Epilepsy', 'Tremors or Parkinsonism', 'Numbness/Neuropathic pain'],
    features: ['Electrodiagnostics (ECG/EEG)', 'Stroke Management Protocol', 'Dementia Research & Support', 'Memory Clinic Services']
  },
  {
    id: 'neurosurgery',
    name: 'Neurosurgery',
    iconName: 'Activity',
    description: 'Advanced brain and spinal microsurgeries, shunt insertions, tumor removals, and endoscopic neurosurgeries.',
    symptoms: ['Severe radiating neck/back pain', 'Brain Tumours', 'Aneurysms', 'Hydrocephalus', 'Spinal cord pressure'],
    features: ['Fellowship Endoscopic Surgery', 'Minimally Invasive Neuro-Spine', 'Complex Cranial Suturing', 'Post-Op ICU Recovery']
  },
  {
    id: 'pulmonary',
    name: 'Pulmonary Medicine',
    iconName: 'Wind',
    description: 'Specialists in chronic asthma, COPD, bronchitis, tuberculosis, lung infections, and respiratory distress.',
    symptoms: ['Chronic Dry Cough', 'Shortness of breath', 'Sleep Snoring/Apnea', 'Chest tightness', 'Wheezing'],
    features: ['Advanced PFT Lab', 'Allergy Screenings', 'Sleep Study / Polysomnography', 'COPD Rehabilitation Clinics']
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    iconName: 'Heart',
    description: 'Comprehensive preventive and diagnostic cardiac screening, ECG interpretation, and cardiovascular care.',
    symptoms: ['Chest Palpitation', 'Mild breathlessness on walking', 'High Blood Pressure', 'Unexplained dizziness'],
    features: ['High-Sensitivity ECG Systems', 'Preventive Heart Screening', 'Cardiovascular Monitoring', 'Hypertension Control']
  },
  {
    id: 'urology',
    name: 'Urology & Andrologist',
    iconName: 'ShieldAlert',
    description: 'Advanced kidney stones resolution, prostate management, and reconstructive voiding system surgeries.',
    symptoms: ['Kidney/Ureter stones', 'Burning Urination', 'Prostate enlargement', 'Incontinence'],
    features: ['Laparoscopic Lithotripsy', 'Benign Prostate Hyperplasia Management', 'UTI Rapid Panels', 'Male Infertility Therapy']
  },
  {
    id: 'general-medicine',
    name: 'General Medicine',
    iconName: 'Stethoscope',
    description: 'Primary care diagnostic setups, infectious diseases therapy, diabetes, hypertension, and routine health checks.',
    symptoms: ['Persistent Fever', 'Seasonal Allergies', 'High blood sugar levels', 'General body weakness'],
    features: ['Comprehensive Health Profile', 'Geriatric Senior Services', 'Infectious Disease Triage', 'Chronic Lifestyle Guidance']
  },
  {
    id: 'general-surgery',
    name: 'General & Laparoscopic Surgery',
    iconName: 'Scissors',
    description: 'Minimally invasive keyhole surgeries, hernia repair, appendectomy, gallstones, and general abdominal surgeries.',
    symptoms: ['Severe lower abdomen pain', 'Abdominal Hernias', 'Gallstones symptoms', 'Lumps / Swellings'],
    features: ['Advanced Keyhole Laparoscopy', 'Same-day discharge (Day Surgery)', 'Suture clinics', 'Minimal Scar Technology']
  },
  {
    id: 'icu-emergency',
    name: 'ICU & Emergency Care',
    iconName: 'Flame',
    description: 'Fully equipped critical care team, multi-channel monitors, and 24/7 trauma emergency systems.',
    symptoms: ['Severe Trauma', 'Acute difficulty breathing', 'Cardiac arrest signals', 'Loss of responsiveness'],
    features: ['Continuous Vital Monitoring', 'Ventilators & Advanced Support', 'Specialist Critical Care Team', 'Emergency Red-Zone Alert']
  }
];

export const SERVICES: Service[] = [
  {
    id: 'digital-xray',
    name: 'Digital X-Ray',
    iconName: 'Scan',
    category: 'diagnostic',
    description: 'High-definition digital skeletal and chest imaging with ultra-low radiation emissions.',
    highlight: 'Instant Imaging'
  },
  {
    id: 'ecg',
    name: 'ECG Analysis',
    iconName: 'HeartPulse',
    category: 'diagnostic',
    description: 'Highly sensitive multichannel electrocardiography indicating rapid cardiovascular signals.',
  },
  {
    id: 'bmd',
    name: 'BMD (Bone Mineral Density)',
    iconName: 'Layers',
    category: 'diagnostic',
    description: 'Advanced dual-energy assessment measuring bone core density for osteoporosis diagnosis.',
    highlight: 'Highly accurate'
  },
  {
    id: 'pft',
    name: 'Pulmonary Function Test (PFT)',
    iconName: 'Wind',
    category: 'diagnostic',
    description: 'Digital spirometric profiles estimating precise lung volume status, airway compliance.',
  },
  {
    id: 'auto-lab',
    name: 'Fully Automated Laboratory',
    iconName: 'FlaskConical',
    category: 'diagnostic',
    description: 'Self-calibrating chemical and hematological analyzers, guaranteeing same-day medical accuracy.',
    highlight: 'Auto-Validated'
  },
  {
    id: 'ultrasound',
    name: 'Ultrasound Scan',
    iconName: 'Waves',
    category: 'diagnostic',
    description: 'High-frequency echography providing live scanning of abdominal, pelvic systems, and blood flow Doppler.',
  },
  {
    id: 'ct-scan',
    name: 'CT Scan',
    iconName: 'Shield',
    category: 'diagnostic',
    description: 'Ultra-fast multi-slice tomographic scans offering complete regional structural clarity.',
  },
  {
    id: 'physiotherapy',
    name: 'Advanced Physiotherapy',
    iconName: 'Dumbbell',
    category: 'rehabilitation',
    description: 'Therapeutic modalities including Ultrasound, TENS, Traction, and custom guided movement exercises.',
    highlight: 'Certified Therapist Led'
  },
  {
    id: 'stroke-rehab',
    name: 'Stroke Rehabilitation',
    iconName: 'BrainCircuit',
    category: 'rehabilitation',
    description: 'Custom neuromuscular rehabilitation models supporting motor plasticity and speech progress.',
    highlight: 'Apollo Training Protocols'
  },
  {
    id: 'brain-spine-rehab',
    name: 'Brain, Spine & Nerve Rehab',
    iconName: 'Accessibility',
    category: 'rehabilitation',
    description: 'Advanced physical and psychotherapy to overcome severe posture lag, palsy, and severe neurological injury.',
  },
  {
    id: 'pain-clinic',
    name: 'Pain Clinic',
    iconName: 'Activity',
    category: 'care',
    description: 'Evidence-backed joint infiltration and therapy to systematically manage chronic arthritis and spine stiffness.',
  },
  {
    id: 'paralysis-clinic',
    name: 'Paralysis Care Clinic',
    iconName: 'Tv',
    category: 'care',
    description: 'Dedicated multidisciplinary service line to care for Hemiplegic, Quadriplegic, and Bell\'s Palsy cases.',
  },
  {
    id: 'emergency-247',
    name: '24/7 Trauma Emergency',
    iconName: 'PhoneCall',
    category: 'care',
    description: 'Round-the-clock intensive trauma response with on-site specialist guidance.',
    highlight: 'Ambulance Support'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'K. Ramasubba Setty',
    age: 58,
    condition: 'Hemiplegic Stroke Rehabilitation',
    review: 'I suffered a stroke that left my right arm and leg paralyzed. Thanks to Dr. Dinesh Kumar Reddy\'s customized physical and neural rehabilitation, I regained 90% of my mobility in just 12 weeks. Extraordinary service!',
    rating: 5,
    treatmentDoctor: 'Dr. M. Dinesh Kumar Reddy'
  },
  {
    id: 't2',
    name: 'P. Saraswathi',
    age: 46,
    condition: 'Spine & Disc Decompression',
    review: 'Severe back pain kept me bedridden. The neuro team diagnosed disc compression. Rather than immediate open surgery, they used dedicated therapy, spine rehab, and core-strengthening. I am completely pain-free now!',
    rating: 5,
    treatmentDoctor: 'Dr. V. Anantha Kiran Kumar'
  },
  {
    id: 't3',
    name: 'S. Mohammed Ghouse',
    age: 62,
    condition: 'Chronic Asthmatic Care',
    review: 'My severe breathlessness had become unmanageable. Dr. Hari Nagendra performed a detailed spirometry PFT and overhauled my daily medication plan. Excellent clinical diagnostics in Piler.',
    rating: 5,
    treatmentDoctor: 'Dr. A. Hari Nagendra'
  },
  {
    id: 't4',
    name: 'G. Viswanath Reddy',
    age: 39,
    condition: 'Polytrauma Knee Fracture Reconstructive Surgery',
    review: 'Following an accident, my knee joint was severely fractured. Dr. Purna Chandra Rao executed a marvelous reconstructive surgery, and Dr. Dinesh\'s rehab team got me walking with full weight-bearing capacity within 3 months.',
    rating: 5,
    treatmentDoctor: 'Dr. N. Purna Chandra Rao'
  }
];

export const REHAB_MILESTONES: RehabMilestone[] = [
  {
    id: 'case-stroke',
    title: 'Severe Post-Stroke Hemiplegia',
    patientInitials: 'T.V.R (64 yrs, Male)',
    condition: 'Right-sided palsy, unable to stand independently.',
    preTreatment: 'Completely chair-bound, zero joint grip muscle tone.',
    postTreatment: 'Walks independently with a normal gait, full forearm rotation.',
    duration: '10 Weeks of Intensive Neuro Rehab',
    percentageRecovery: 94
  },
  {
    id: 'case-spine',
    title: 'Lumbar Disc Herniation with Sciatica',
    patientInitials: 'K.L. (42 yrs, Female)',
    condition: 'Excruciating radiating leg pain, unable to sit for 5 minutes.',
    preTreatment: 'Pain index 9/10, severe nerve root compression.',
    postTreatment: 'Pain-free, full spinal range of motion, returns to desk work.',
    duration: '8 Weeks of Spinal Physical Rehab',
    percentageRecovery: 90
  },
  {
    id: 'case-knee',
    title: 'Post Total Knee Replacement (TKR)',
    patientInitials: 'M.S. (69 yrs, Female)',
    condition: 'Severe flexion lag status-post bilateral knee arthroplasty.',
    preTreatment: 'Knee flexion restricted to 60°, intense fear of movement.',
    postTreatment: 'Flexion achieved up to 115°, walking up stairs with ease.',
    duration: '6 Weeks Post-OP Knee Rehab Plan',
    percentageRecovery: 98
  }
];
