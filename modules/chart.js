async function creerGraph(id, data, label) {
    const values = data.map((item) => item.values);
    const labels = data.map((item) => item.labels);

    const ctx = document.getElementById(id).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: values,
                borderColor: 'rgb(192, 75, 75)',
                tension: 0.1
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
        }
    });
}

export { creerGraph };