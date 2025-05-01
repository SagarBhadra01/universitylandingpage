document.addEventListener("DOMContentLoaded", function () {
  // Check if we're on the courses page
  const featuredCoursesSection = document.getElementById("featured-courses");

  if (featuredCoursesSection) {
    // Add a "Featured Courses From API" section
    const container = document.createElement("div");
    container.className = "container";

    const sectionTitle = document.createElement("h2");
    sectionTitle.className = "section-title";
    sectionTitle.textContent = "Featured Courses";

    const courseContainer = document.createElement("div");
    courseContainer.className = "api-courses-container";
    courseContainer.innerHTML =
      '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading courses...</div>';

    container.appendChild(sectionTitle);
    container.appendChild(courseContainer);

    // Create a new section for API courses
    const apiCoursesSection = document.createElement("section");
    apiCoursesSection.id = "api-courses";
    apiCoursesSection.appendChild(container);

    // Insert after the existing courses section
    const programsSection = document.getElementById("programs");
    if (programsSection) {
      programsSection.parentNode.insertBefore(
        apiCoursesSection,
        programsSection.nextSibling
      );
    }

    // Fetch courses from API
    fetch("/api/courses")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((courses) => {
        // Clear loading indicator
        courseContainer.innerHTML = "";

        // Create cards for each course
        courses.forEach((course) => {
          const courseCard = document.createElement("div");
          courseCard.className = "api-course-card";

          courseCard.innerHTML = `
            <div class="course-header">
              <h3>${course.name}</h3>
            </div>
            <div class="course-body">
              <div class="course-meta">
                <div class="meta-item">
                  <i class="fas fa-clock"></i>
                  <span>${course.duration}</span>
                </div>
              </div>
              <p>${course.description}</p>
              <div class="course-action">
                <a href="admissions.html#application" class="cta-button">Apply Now</a>
                <a href="#" class="outline-btn">More Info</a>
              </div>
            </div>
          `;

          courseContainer.appendChild(courseCard);
        });
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        courseContainer.innerHTML = `
          <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            <p>Sorry, there was an error loading the courses. Please try again later.</p>
          </div>
        `;
      });
  }
});
