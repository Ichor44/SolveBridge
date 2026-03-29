export type ProblemCategory = 'Engineering' | 'Research' | 'Business';
export type ProjectStatus = 'Open' | 'In Progress' | 'Completed' | 'Paid';

export interface Problem {
  id: string;
  title: string;
  description: string;
  category: ProblemCategory;
  posterId: string;
  posterName: string;
  budget: string;
  deadline: string;
  createdAt: string;
  status: ProjectStatus;
  proposalsCount: number;
}

export interface Proposal {
  id: string;
  problemId: string;
  solverId: string;
  solverName: string;
  approach: string;
  timeline: string;
  qualifications: string;
  submittedAt: string;
  status: 'Pending' | 'Accepted' | 'Declined';
}

export const PROBLEMS: Problem[] = [
  {
    id: '1',
    title: 'Autonomous Drone Navigation in GPS-Denied Environments',
    description: 'Developing a robust SLAM-based navigation system for small UAVs to navigate through dense forest environments without GPS assistance. The goal is to maintain sub-meter accuracy over a 2km trajectory.',
    category: 'Engineering',
    posterId: 'u1',
    posterName: 'AeroTech Systems',
    budget: '$15,000',
    deadline: '2024-12-15',
    createdAt: '2024-10-01',
    status: 'Open',
    proposalsCount: 3,
  },
  {
    id: '2',
    title: 'Impact of Micro-plastics on Soil Microbial Diversity',
    description: 'A longitudinal study investigating how the accumulation of micro-plastics (specifically polyethylene and polypropylene) affects the functional diversity of soil microbiomes in temperate agricultural zones.',
    category: 'Research',
    posterId: 'u2',
    posterName: 'BioResearch Institute',
    budget: '$8,000',
    deadline: '2024-11-30',
    createdAt: '2024-09-20',
    status: 'Open',
    proposalsCount: 1,
  },
  {
    id: '3',
    title: 'Optimizing Last-Mile Delivery for Perishable Goods',
    description: 'Developing a predictive model and routing algorithm to reduce spoilage rates by 20% in urban food delivery networks. Focus on traffic patterns and temperature-sensitive transit times.',
    category: 'Business',
    posterId: 'u3',
    posterName: 'FreshLogistics',
    budget: '$12,000',
    deadline: '2025-01-10',
    createdAt: '2024-10-05',
    status: 'Open',
    proposalsCount: 5,
  },
];

export const PROPOSALS: Proposal[] = [
  {
    id: 'p1',
    problemId: '1',
    solverId: 's1',
    solverName: 'Dr. Elena Vance',
    approach: 'I propose using a stereo-vision based V-SLAM approach combined with LiDAR odometry. Our algorithm uses a lightweight neural network for feature extraction that runs in real-time on NVIDIA Jetson Orin Nano. We will implement a custom EKF for sensor fusion.',
    timeline: '12 weeks',
    qualifications: 'PhD in Robotics, 10 years experience in Computer Vision, lead developer of OpenSLAM-X.',
    submittedAt: '2024-10-02',
    status: 'Pending',
  },
  {
    id: 'p2',
    problemId: '1',
    solverId: 's2',
    solverName: 'Mark Chen',
    approach: 'Using ROS2 and Nav2 stack with specialized visual odometry plugins. Focus on low-cost ultrasonic sensors for obstacle avoidance in tight gaps.',
    timeline: '8 weeks',
    qualifications: 'Embedded Systems Engineer, former drone racing competitor.',
    submittedAt: '2024-10-04',
    status: 'Pending',
  }
];
