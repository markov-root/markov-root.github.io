// src/theme/DocItem/Landing/Info/Authors.jsx
import React from 'react';
import styles from './Authors.module.css';

export default function Authors() {
  const authors = [
    {
      name: "Markov Grey",
      description: "Primary author and project developer. Contributes across all aspects - research, writing, distillation, website development, video creation. Previously scriptwriter at Rational Animations, distillation fellow at AI Safety Info (Stampy). Also currently co-founder and CTO at Equilibria Network. In a previous life has also worked in software development and cybersecurity."
    },
    {
      name: "Charbel-Raphaël Segerie",
      description: "Executive Director of CeSIA. Leads organization, scientific direction and coordination. Significant pedagogical experience including ARENA projects, MLAB, and Europe's first general purpose AI safety course. Writing featured in BlueDot's interpretability curriculum."
    },
    {
      name: "Jeanne Salle",
      description: "AI safety teacher at ENS Ulm. Contributing author."
    },
    {
      name: "Charles Martinet",
      description: "Head of policy at CeSIA, research affiliate at Oxford AIGi and previously at GovAI. Contributing author."
    }
  ];

  return (
    <div className={styles.authorsContainer}>
      <div className={styles.sectionHeader}>
        <div className={styles.iconContainer}>
          <img src="/img/icons/author.svg" alt="" className={styles.icon} />
        </div>
        <h2 className={styles.sectionTitle}>Authors</h2>
      </div>
      
      <div className={styles.authorsList}>
        {authors.map((author, index) => (
          <div key={index} className={styles.authorItem}>
            <h3 className={styles.authorName}>{author.name}</h3>
            <p className={styles.authorDescription}>{author.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
