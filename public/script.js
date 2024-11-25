document.getElementById('examForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const branch = encodeURIComponent(document.getElementById('branch').value);
    const semester = encodeURIComponent(document.getElementById('semester').value);
    const scheme = encodeURIComponent(document.getElementById('scheme').value);

    if (!branch || !semester || !scheme) {
        alert('Please select all fields');
        return;
    }

    fetch(`/api/exams/${branch}/${semester}/${scheme}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('result').innerHTML = `<p>Error: ${data.error}</p>`;
            } else {
                let tableHtml = `
                    <table>
                        <tr>
                            <th>Subject Title</th>
                            <th>Exam Date</th>
                            <th>Subject Code</th>
                            <th>Mcode</th>
                            <th>Session</th>
                            <th>Scheme</th>
                        </tr>
                `;
                data.forEach(item => {
                    tableHtml += `
                        <tr>
                            <td>${item.SUB_TITLE || ''}</td>
                            <td>${item['Exam Date'] || ''}</td>
                            <td>${item.SUB_CODE || ''}</td>
                            <td>${item.MCode || ''}</td>
                            <td>${item.Sess || ''}</td>
                            <td>${item.Schm || ''}</td>
                        </tr>
                    `;
                });
                tableHtml += '</table>';
                document.getElementById('result').innerHTML = tableHtml;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').innerHTML = '<p>An error occurred while fetching the data.</p>';
        });
});