function download_csv(data) {
    if (confirm("This will download a csv file with the pixel data. It may take a second depending on the image size. Click 'ok' to continue.")){
        csv = ""
        myLen = data.length
        for (i = 0; i < Math.floor(myLen/4); i++){
            for (j = 0; j < 4; j++){
                csv += data[i*4+j].toString() + ","
            }
            csv += "\n"
        }
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'pixelData.csv';
        hiddenElement.click();
    }
}