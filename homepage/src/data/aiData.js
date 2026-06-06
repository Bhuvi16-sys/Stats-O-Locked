/**
 * Artificial Intelligence & Sub-branches Mapping Data Module
 * Maps the hierarchical structure from the central AI node to level 1 and level 2 branches.
 * Contains both hierarchical tree structures and flat lists of nodes/links suitable for 2D/3D visual rendering systems.
 */

// 1. Hierarchical Tree Structure
export const aiTreeData = {
  id: "ai",
  name: "Artificial Intelligence",
  level: 0,
  color: "#ffffff",
  description: "The science and engineering of making intelligent machines, especially intelligent computer programs.",
  position: [0, 0, 0],
  children: [
    {
      id: "ml",
      name: "Machine Learning",
      level: 1,
      color: "#00f0ff",
      description: "Systems that learn from data, identify patterns, and make decisions with minimal human intervention.",
      position: [-2.5, 1.2, 0.5],
      children: [
        {
          id: "supervised",
          name: "Supervised Learning",
          level: 2,
          color: "#00e5ff",
          description: "Models trained on labeled data where correct outputs are mapping inputs.",
          position: [-3.8, 2.0, 1.2],
          children: []
        },
        {
          id: "unsupervised",
          name: "Unsupervised Learning",
          level: 2,
          color: "#00e5ff",
          description: "Models finding hidden patterns or intrinsic structures in input data without labels.",
          position: [-3.5, 0.2, -0.2],
          children: []
        }
      ]
    },
    {
      id: "dl",
      name: "Deep Learning",
      level: 1,
      color: "#7c3aed",
      description: "Subfield of ML based on multi-layered artificial neural networks capable of learning complex representations.",
      position: [2.5, 1.2, -0.5],
      children: []
    },
    {
      id: "nlp",
      name: "Natural Language Processing",
      level: 1,
      color: "#3b82f6",
      description: "Computational techniques that enable machines to read, decipher, and generate human language.",
      position: [-1.5, -1.5, 1.2],
      children: [
        {
          id: "transformers",
          name: "Transformers",
          level: 2,
          color: "#60a5fa",
          description: "Attention-based architecture revolutionizing modern natural language understanding and translation tasks.",
          position: [-2.8, -2.5, 1.8],
          children: []
        },
        {
          id: "llms",
          name: "Large Language Models",
          level: 2,
          color: "#60a5fa",
          description: "Massive generative architectures trained on global-scale texts capable of complex reasoning.",
          position: [-0.5, -2.5, 2.0],
          children: []
        }
      ]
    },
    {
      id: "vision",
      name: "Computer Vision",
      level: 1,
      color: "#ec4899",
      description: "Field of study focusing on how computers can gain high-level understanding from digital images or videos.",
      position: [1.8, -1.5, -1.2],
      children: [
        {
          id: "cnns",
          name: "CNNs",
          level: 2,
          color: "#f472b6",
          description: "Convolutional Neural Networks designed to automatically and adaptively learn spatial hierarchies of features.",
          position: [3.0, -2.2, -1.8],
          children: []
        },
        {
          id: "detection",
          name: "Object Detection",
          level: 2,
          color: "#f472b6",
          description: "Technique to locate and identify multiple semantic objects in visual media.",
          position: [1.2, -2.6, -0.8],
          children: []
        }
      ]
    },
    {
      id: "robotics",
      name: "Robotics",
      level: 1,
      color: "#10b981",
      description: "Integrating perception, planning, and control to construct autonomous physical machines.",
      position: [0, 2.5, -1.5],
      children: []
    }
  ]
};

// 2. Flat Nodes Structure (useful for D3 / Three.js node rendering)
export const aiNodes = [
  { 
    id: "ai", 
    label: "Artificial Intelligence", 
    level: 0, 
    group: "root", 
    position: [0, 0, 0], 
    color: "#ffffff",
    description: "The science and engineering of making intelligent machines."
  },
  // Level 1
  { 
    id: "ml", 
    label: "Machine Learning", 
    level: 1, 
    group: "ml", 
    position: [-2.5, 1.2, 0.5], 
    color: "#00f0ff",
    description: "Systems that learn from data and improve over time without explicit instructions."
  },
  { 
    id: "dl", 
    label: "Deep Learning", 
    level: 1, 
    group: "dl", 
    position: [2.5, 1.2, -0.5], 
    color: "#7c3aed",
    description: "Hierarchical neural network models designed to mimic biological brain paths."
  },
  { 
    id: "nlp", 
    label: "Natural Language Processing", 
    level: 1, 
    group: "nlp", 
    position: [-1.5, -1.5, 1.2], 
    color: "#3b82f6",
    description: "Understanding, translating, and generating human spoken/written systems."
  },
  { 
    id: "vision", 
    label: "Computer Vision", 
    level: 1, 
    group: "vision", 
    position: [1.8, -1.5, -1.2], 
    color: "#ec4899",
    description: "Deciphering and automating high-level visual recognition tasks."
  },
  { 
    id: "robotics", 
    label: "Robotics", 
    level: 1, 
    group: "robotics", 
    position: [0, 2.5, -1.5], 
    color: "#10b981",
    description: "Autonomous physical systems operating within complex environments."
  },
  // Level 2
  { 
    id: "supervised", 
    label: "Supervised Learning", 
    level: 2, 
    group: "ml", 
    position: [-3.8, 2.0, 1.2], 
    color: "#00e5ff",
    description: "Training algorithms on pre-labeled input/output mappings."
  },
  { 
    id: "unsupervised", 
    label: "Unsupervised Learning", 
    level: 2, 
    group: "ml", 
    position: [-3.5, 0.2, -0.2], 
    color: "#00e5ff",
    description: "Finding hidden structures and anomalies within unlabeled inputs."
  },
  { 
    id: "transformers", 
    label: "Transformers", 
    level: 2, 
    group: "nlp", 
    position: [-2.8, -2.5, 1.8], 
    color: "#60a5fa",
    description: "Self-attention models powering cutting-edge contextual translation."
  },
  { 
    id: "llms", 
    label: "Large Language Models", 
    level: 2, 
    group: "nlp", 
    position: [-0.5, -2.5, 2.0], 
    color: "#60a5fa",
    description: "Massive text networks capable of context-aware prompt parsing."
  },
  { 
    id: "cnns", 
    label: "CNNs", 
    level: 2, 
    group: "vision", 
    position: [3.0, -2.2, -1.8], 
    color: "#f472b6",
    description: "Grid-parsing layers designed for automated pixel feature extraction."
  },
  { 
    id: "detection", 
    label: "Object Detection", 
    level: 2, 
    group: "vision", 
    position: [1.2, -2.6, -0.8], 
    color: "#f472b6",
    description: "Automated bounding boxes identifying objects inside visual streams."
  }
];

// 3. Flat Connections/Links Structure
export const aiLinks = [
  // Level 0 to Level 1
  { source: "ai", target: "ml" },
  { source: "ai", target: "dl" },
  { source: "ai", target: "nlp" },
  { source: "ai", target: "vision" },
  { source: "ai", target: "robotics" },
  // Level 1 ML to Level 2
  { source: "ml", target: "supervised" },
  { source: "ml", target: "unsupervised" },
  // Level 1 NLP to Level 2
  { source: "nlp", target: "transformers" },
  { source: "nlp", target: "llms" },
  // Level 1 Vision to Level 2
  { source: "vision", target: "cnns" },
  { source: "vision", target: "detection" }
];
