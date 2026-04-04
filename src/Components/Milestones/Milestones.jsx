import "./Milestones.css";
import graphData from "../../assets/milestones_data";
import { motion, AnimatePresence } from "motion/react";
import PropTypes from "prop-types";
import { useState, useCallback, lazy, Suspense } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const { nodes, edges } = graphData;
const primaryNodes = nodes.filter((n) => n.type === "primary");
const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

// Lazy load the heavy 3D component (Three.js + R3F)
const Constellation3D = lazy(() => import("./Constellation3D"));

/* ---------- Info Panel ---------- */

const InfoPanel = ({ node }) => (
  <motion.div
    className="ctd-info"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
  >
    <div className="ctd-info-row">
      <i className={`fas ${node.icon} ctd-info-icon`}></i>
      <h3 className="ctd-info-title">{node.label}</h3>
      <span className="ctd-info-year">{node.year}</span>
    </div>
    <p className="ctd-info-tagline">{node.tagline}</p>
    <p className="ctd-info-blurb">{node.blurb}</p>
  </motion.div>
);

InfoPanel.propTypes = { node: PropTypes.object.isRequired };

/* ---------- Mobile ---------- */

const MobileConnector = () => (
  <div className="ctd-m-connector" aria-hidden="true">
    <div className="ctd-m-line" />
    <div className="ctd-m-dot-conn" />
    <div className="ctd-m-line" />
  </div>
);

/* ---------- Main ---------- */

const Milestones = () => {
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [activeNodeId, setActiveNodeId] = useState(null);

  const handleHover = useCallback((id) => setHoveredNodeId(id), []);
  const handleLeave = useCallback(() => setHoveredNodeId(null), []);
  const handleTap = useCallback(
    (id) => setActiveNodeId((prev) => (prev === id ? null : id)),
    []
  );

  const hoveredNode = hoveredNodeId
    ? primaryNodes.find((n) => n.id === hoveredNodeId)
    : null;

  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <motion.section id="milestones" className="milestones section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
          <h2 className="section-title">
            Origin <span className="title-accent">Graph</span>
          </h2>
          <p className="section-subtitle">
            {!isDesktop
              ? "Every node is a milestone — trace the journey"
              : "Every node is a milestone — hover or tap to trace the connections"}
          </p>
        </motion.div>
      </div>

      {/* Desktop 3D constellation — full width, outside container */}
      {isDesktop && (
        <div className="ctd-canvas-wrap">
          <div className="ctd-vignette" />
          <Suspense fallback={<div className="ctd-loading">Loading constellation...</div>}>
            <Constellation3D
              primaryNodes={primaryNodes}
              secondaryNodes={nodes.filter((n) => n.type === "secondary")}
              edges={edges}
              nodeMap={nodeMap}
              hoveredNodeId={hoveredNodeId}
              onHover={handleHover}
              onLeave={handleLeave}
            />
          </Suspense>

          <AnimatePresence>
            {hoveredNode && <InfoPanel node={hoveredNode} />}
          </AnimatePresence>
        </div>
      )}

      {/* Mobile vertical layout */}
      {!isDesktop && (
        <div className="container">
          <div className="ctd-mobile">
            {primaryNodes.map((node, index) => (
              <div key={node.id}>
                <motion.div
                  className={`ctd-m-card ${activeNodeId === node.id ? "ctd-m-card-active" : ""}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  onClick={() => handleTap(node.id)}
                >
                  <div className="ctd-m-icon">
                    <i className={`fas ${node.icon}`}></i>
                  </div>
                  <div className="ctd-m-body">
                    <div className="ctd-m-head">
                      <span className="ctd-m-label">{node.label}</span>
                      <span className="ctd-m-year">{node.year}</span>
                    </div>
                    <p className="ctd-m-tagline">{node.tagline}</p>
                    <AnimatePresence>
                      {activeNodeId === node.id && (
                        <motion.p
                          className="ctd-m-blurb"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          {node.blurb}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
                {index < primaryNodes.length - 1 && <MobileConnector />}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default Milestones;
