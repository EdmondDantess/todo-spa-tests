export function downloadHandler(file: File, type: string, name: string) {
    const blob = new Blob([file], {type});
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
    link.remove();
}



