function renderHeader() {
    const head = document.getElementById('2aj-head');
        head.innerHTML += `
            <!-- Required meta tags -->
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            
            <!-- Bootstrap CSS -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
            
            <!-- Custom CSS -->
            <link rel="stylesheet" href="bootstrap-ow.css">
            <link rel="stylesheet" href="style.css">

            <!-- Custom JS -->
            <script type="text/javascript" src="script.js"></script>

            <title>Projects | 2000andjames</title>
        `;
}

function renderProjects() {
    fetch("/projects.json")
    .then(response => {
       return response.json();
    })
    .then(data => {
        // console.log(data);
        let projectsArrayLength = data.projects.length;

        for(let i = 0; i < projectsArrayLength; i++) {

            let proName = data.projects[i].name;
            let proDescription = data.projects[i].description;
            let technologyArray = data.projects[i].technology;
            let technologyArrayLength = technologyArray.length;
            let proImage = data.projects[i].image_url;
            const isLive = data.projects[i].live_project;

            const projects = document.getElementById('2aj-projects-p');

            if (isLive) {
                projects.innerHTML += `
                    <div class="col d-flex align-items-stretch">
                        <div class="card">    
                            <div class="card-body">
                                <h4>${proName}</h4>
                                <p id="2aj-tech-${i}" class="project-technology"></p>
                                <p class="project-description">${proDescription}</p>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                projects.innerHTML += `
                    <div class="col d-flex align-items-stretch">
                        <div class="card coming-soon">    
                            <div class="card-body">
                                <h4>[somethingNew]</h4>
                                <p style="text-align:center">coming soon...</p>
                            </div>
                        </div>
                    </div>
                `;
            }

            console.log("Name: " + proName);
            // console.log("Description: " + proDescription);
            // console.log("Image URL: " + proImage);
            // console.log("Technologies used: " + technologyArrayLength);
            // console.log("Technologies used: " + technologyArray);

            for(let t = 0; t < technologyArrayLength; t++) {
                
                let proTechnology = data.projects[i].technology[t];
                let techElID = `2aj-tech-${i}`;
                const techs = document.getElementById(techElID);
                techs.innerHTML += `${proTechnology}`;
                
                console.log(proTechnology);

                // Add seperator between tech
                if (technologyArrayLength-t > 1) {    
                    techs.innerHTML += `, `;
                }

            }
            
        }
        
    });
}

renderHeader();
renderProjects();