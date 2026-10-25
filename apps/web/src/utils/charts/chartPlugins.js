export const currentTimePosition = {
  // Define an ID for this plugin.
  id: 'currentTimePosition',

  /**
   * This method is called after the datasets are drawn on the chart.
   * It draws a vertical line at the current date's position on the x-axis.
   *
   * @param {Object} chart - The chart instance.
   * @param {Object} chart.ctx - The drawing context.
   * @param {Object} chart.chartArea - The chart area boundaries.
   * @param {number} chart.chartArea.top - The top boundary of the chart area.
   * @param {number} chart.chartArea.bottom - The bottom boundary of the chart area.
   * @param {Object} chart.scales - The scales used in the chart.
   * @param {Object} chart.scales.x - The x-axis scale.
   * @param {Object} args - Additional arguments.
   * @param {Object} options - Plugin options provided by the user.
   */
  afterDatasetsDraw(
    { ctx, chartArea: { top, bottom }, scales: { x } },
    args,
    options
  ) {
    // Save the current state of the drawing context.
    ctx.save();
    // Begin a new path for drawing.
    ctx.beginPath();
    // Set the stroke style (color of the line) from options, default to black if not provided.
    ctx.strokeStyle = options.color || 'black';
    // Set the line width from options, default to 1 if not provided.
    ctx.lineWidth = options.lineThickness || 1;
    // Get the current date and set its time to 00:00:00:0000.
    const currentDate = new Date().setHours(0, 0, 0, 0);
    // Move the drawing cursor to the top position of the vertical line at the current date's position on the x-axis.
    ctx.moveTo(x.getPixelForValue(currentDate), top);
    // Draw a line from the top to the bottom of the chart area at the current date's position on the x-axis.
    ctx.lineTo(x.getPixelForValue(currentDate), bottom);
    // Stroke the path (draw the line).
    ctx.stroke();
    // Restore the previous state of the drawing context.
    ctx.restore();
  },
};
