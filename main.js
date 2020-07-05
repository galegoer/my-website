let numberPics = 0;
let numTiers = 3;

window.onload = function() { 

    var dropbox = document.getElementById('dropbox');

    dropbox.addEventListener('dragover', allowDrop, false);
    dropbox.addEventListener('drop', drop, false);

    function drop(evt) {
        var dropbox = document.getElementById('dropbox');
        evt.stopPropagation();
        evt.preventDefault(); 
        var imageUrl = evt.dataTransfer.getData('url');
        txt = evt.dataTransfer.getData('text');
        if (txt.slice(0,3) == "pic") {
            //already existing picture simply transfer id
            dropbox.appendChild(document.getElementById(txt));
        } else {
            //create a new image it is a url
            let newPic = document.createElement('img');
            newPic.src = imageUrl;
            newPic.className = "newPic";
            newPic.id = "pic"+numberPics;
            newPic.alt = imageUrl;
            newPic.draggable = true;
            newPic.addEventListener('dragstart', drag, false);
            newPic.addEventListener('dragend', dragend, false);
            dropbox.appendChild(newPic);
            numberPics++;
        }
        
    }

    var rows = document.querySelectorAll(".tierrow");

    rows.forEach(function(row) {
        row.addEventListener('dragover', allowDrop, false);
        row.addEventListener('drop', rowdrop, false);
    });

    var trash = document.getElementById('trash');

    trash.addEventListener('dragover', allowDrop, false);
    trash.addEventListener('drop', deletePic, false);

    function rowdrop(evt) {
        evt.preventDefault();
        let rowId = evt.target.id;
        if(rowId.slice(0,3) != "row") {
            row = document.getElementById(evt.target.id).parentElement;
        } else {
            row = document.getElementById(evt.target.id);
        }
        let pic = evt.dataTransfer.getData("text");
        row.appendChild(document.getElementById(pic));
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }
      
    function dragend(ev) {
        document.getElementById('trash').style.opacity = "0";
    }

    function drag(ev) {
        document.getElementById('trash').style.opacity = "1";
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function deletePic(ev) {
        ev.preventDefault();
        let pic = document.getElementById(ev.dataTransfer.getData("text"));
        pic.parentNode.removeChild(pic);
        document.getElementById('trash').style.opacity = "0";
    }
      
    var addTierButton = document.getElementById('addtier');
    var deleteTierButton = document.getElementById('deletetier');

    addTierButton.addEventListener("click", addTier);
    deleteTierButton.addEventListener("click", deleteTier);

    function addTier() {
        numTiers++;
        var table = document.getElementById("tierlist");
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(-1);
        var cell2 = row.insertCell(-1);
        var cell3 = row.insertCell(-1);
        cell1.className = "colorcell";
        let color = document.createElement('input');
        color.id = "tiercolor"+numTiers;
        color.type = "color";
        document.querySelectorAll(".colorcell")[numTiers-1].appendChild(color);
        
        cell2.className = "tier";
        document.querySelectorAll(".tier")[numTiers-1].contentEditable = "true";
        let txtInput = document.createElement('span');
        txtInput.id = "tiertext"+numTiers;
        txtInput.innerHTML = "Tier";
        document.querySelectorAll(".tier")[numTiers-1].appendChild(txtInput);
    
        cell3.className = "tierrow";
        cell3.id = "row"+numTiers;
        cell3.addEventListener('dragover', allowDrop, false);
        cell3.addEventListener('drop', rowdrop, false);
    }
    
    function deleteTier() {
        var table = document.getElementById("tierlist");
        table.deleteRow(-1);
        if (numTiers != 0) {
            numTiers--;
        }
    }

    // var element = document.getElementById("tierlist");

    // var element = $("#tierlist"); // global variable
    // var getCanvas; // global variable

    // $("#previewImg").on('click', function () {
    //      html2canvas(element, {
    //      onrendered: function (canvas) {
    //             $("#previewImage").append(canvas);
    //             getCanvas = canvas;
    //          }
    //      });
    // });



    //   function drop(ev) {
    //     ev.preventDefault();
    //     var data = ev.dataTransfer.getData("text");
    //     ev.target.appendChild(document.getElementById(data));
    //   }

    // document.getElementById("tiercolor").addEventListener("input", updateFirst, false);
    // document.getElementById("tiercolor").addEventListener("change", colorChange, false);

    // function colorChange(event) {
    //     console.log(event.target)
    //     var numTiers = document.querySelectorAll("tiercolor").length
    //     var numTiers = document.querySelectorAll("tier").length
    
    //     // .style.color = event.target.value;
    // }

    //bruh = document.getElementsByClassName('background')[0];

    // console.log(bruh);

    // bruh.style.background = "url('https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80')";
  
    //document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80')";

}
