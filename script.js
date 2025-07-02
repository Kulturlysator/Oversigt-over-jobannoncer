function handleInput() {
  const fileInput = document.getElementById("fileInput");
  const linkInput = document.getElementById("linkInput");

  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result;
      extractData(text);
    };

    reader.readAsText(file);
  } else if (linkInput.value) {
    fetch(linkInput.value)
      .then(response => response.text())
      .then(data => extractData(data))
      .catch(() => alert("Kunne ikke hente link."));
  } else {
    alert("Upload en fil eller indsæt et link.");
  }
}

function extractData(text) {
  const deadlineMatch = text.match(/ansøgningsfrist[:\-–]?\s*(\d{1,2}[\.\-/]\d{1,2}[\.\-/]\d{2,4})/i);
  document.getElementById("deadline").value = deadlineMatch ? deadlineMatch[1] : "NA";

  document.getElementById("joblink").value = document.getElementById("linkInput").value || "NA";
  document.getElementById("status").value = "NA";
  document.getElementById("applicationLink").value = "";
}

function saveData() {
  const data = {
    frist: document.getElementById("deadline").value,
    link: document.getElementById("joblink").value,
    status: document.getElementById("status").value,
    ansøgning: document.getElementById("applicationLink").value,
    tid: new Date().toISOString()
  };

  console.log("Gemmer data:", data);
  alert("Data gemt i konsollen (eller i næste version: Google Sheet)");
  localStorage.setItem("job_" + data.tid, JSON.stringify(data));
}
