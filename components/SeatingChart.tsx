
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { TABLES, GUESTS } from '../constants';
import { Guest } from '../types';

interface SeatingChartProps {
  highlightedGuest?: Guest;
}

const SeatingChart: React.FC<SeatingChartProps> = ({ highlightedGuest }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 500;
    const tableRadius = 40;
    const seatRadius = 6;
    const seatDistance = 55;

    // Draw Entrance/Stage Label
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .attr("class", "text-sm font-semibold fill-slate-400 uppercase tracking-widest")
      .text("主舞台 / 场馆入口");

    // Container for tables
    const tablesGroup = svg.append("g");

    TABLES.forEach((table) => {
      const g = tablesGroup.append("g")
        .attr("transform", `translate(${table.x}, ${table.y})`);

      const isHighlightedTable = highlightedGuest?.table === table.id;

      // Draw Table
      g.append("circle")
        .attr("r", tableRadius)
        .attr("class", `fill-white stroke-2 transition-all duration-500 ${isHighlightedTable ? 'stroke-amber-500 shadow-xl' : 'stroke-slate-200'}`)
        .style("filter", isHighlightedTable ? "drop-shadow(0 0 8px rgba(245, 158, 11, 0.5))" : "none");

      g.append("text")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .attr("class", `text-xs font-bold ${isHighlightedTable ? 'fill-amber-600' : 'fill-slate-500'}`)
        .text(`${table.id}号桌`);

      // Draw Seats
      for (let i = 0; i < table.capacity; i++) {
        const angle = (i * 2 * Math.PI) / table.capacity;
        const seatX = Math.cos(angle) * seatDistance;
        const seatY = Math.sin(angle) * seatDistance;
        
        const isHighlightedSeat = isHighlightedTable && highlightedGuest?.seat === i + 1;

        g.append("circle")
          .attr("cx", seatX)
          .attr("cy", seatY)
          .attr("r", isHighlightedSeat ? seatRadius + 2 : seatRadius)
          .attr("class", `transition-all duration-500 ${isHighlightedSeat ? 'fill-amber-500 scale-125' : 'fill-slate-200'}`);
          
        if (isHighlightedSeat) {
            const pulse = g.append("circle")
                .attr("cx", seatX)
                .attr("cy", seatY)
                .attr("r", seatRadius)
                .attr("class", "fill-amber-500 opacity-50")
                .attr("stroke", "none");
            
            pulse.transition()
                .duration(1000)
                .attr("r", seatRadius * 3)
                .attr("opacity", 0)
                .on("end", function repeat() {
                    d3.select(this)
                        .attr("r", seatRadius)
                        .attr("opacity", 0.5)
                        .transition()
                        .duration(1000)
                        .attr("r", seatRadius * 3)
                        .attr("opacity", 0)
                        .on("end", repeat);
                });
        }
      }
    });

  }, [highlightedGuest]);

  return (
    <div className="w-full overflow-x-auto bg-white rounded-2xl shadow-inner border border-slate-100 p-4">
      <svg
        ref={svgRef}
        viewBox="0 0 800 500"
        className="w-full min-w-[600px] h-auto mx-auto"
      />
    </div>
  );
};

export default SeatingChart;
