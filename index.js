var profile = {
  "id": "",
  "name": "",
  "icon": "icon_ultimaker.png",
  "platform": "",

  "inherits": "fdmprinter.json",

  "machine_settings": {
    "machine_width": {
      "default": 200
    },
    "machine_height": {
      "default": 200
    },
    "machine_depth": {
      "default": 200
    },
    "machine_center_is_zero": {
      "default": false
    },
    "machine_nozzle_size": {
      "default": 0.4
    },
    "machine_head_shape_min_x": {
      "default": 75
    },
    "machine_head_shape_min_y": {
      "default": 18
    },
    "machine_head_shape_max_x": {
      "default": 18
    },
    "machine_head_shape_max_y": {
      "default": 35
    },
    "machine_nozzle_gantry_distance": {
      "default": 55
    },
    "machine_nozzle_offset_x_1": {
      "default": 18.0
    },
    "machine_nozzle_offset_y_1": {
      "default": 0.0
    },
    "machine_gcode_flavor": {
      "default": "RepRap (Marlin/Sprinter)"
    },

    "machine_start_gcode": {
      "default": "G21 ;metric values\nG90 ;absolute positioning\nM82 ;set extruder to absolute mode\nM107 ;start with the fan off\nG28 X0 Y0 ;move X/Y to min endstops\nG28 Z0 ;move Z to min endstops\nG1 Z15.0 F9000 ;move the platform down 15mm\nG92 E0 ;zero the extruded length\nG1 F200 E3 ;extrude 3mm of feed stock\nG92 E0 ;zero the extruded length again\nG1 F9000\n;Put printing message on LCD screen\nM117 Printing..."
    },
    "machine_end_gcode": {
      "default": "M104 S0 ;extruder heater off\nM140 S0 ;heated bed heater off (if you have it)\nG91 ;relative positioning\nG1 E-1 F300  ;retract the filament a bit before lifting the nozzle, to release some of the pressure\nG1 Z+0.5 E-5 X-20 Y-20 F9000 ;move Z up a bit and retract filament even more\nG28 X0 Y0 ;move X/Y to min endstops, so the head is out of the way\nM84 ;steppers off\nG90 ;absolute positioning"
    }
  },

  "categories": {
    "material": {
      "settings": {
        "material_bed_temperature": {
          "visible": true
        }
      }
    }
  }
};

var liveUpdate = false;

$("#machine_id").on("input", function() {
    profile.id = $("#machine_id").val();
    if(liveUpdate){
        updateProfileView();
    }
});

$("#machine_name").on("input", function() {
    profile.name = $("#machine_name").val();
    if(liveUpdate){
        updateProfileView();
    }
});

$("#machine_width").on("input", function() {
    profile.machine_settings.machine_width.default = parseInt($("#machine_width").val());
    if(liveUpdate){
        updateProfileView();
    }
});

$("#machine_depth").on("input", function() {
    profile.machine_settings.machine_depth.default = parseInt($("#machine_depth").val());
    if(liveUpdate){
        updateProfileView();
    }
});

$("#machine_height").on("input", function() {
    profile.machine_settings.machine_height.default = parseInt($("#machine_height").val());
    if(liveUpdate){
        updateProfileView();
    }
});

$("#machine_nozzle_orifice").on("input", function() {
    profile.machine_settings.machine_nozzle_size.default = parseFloat($("#machine_nozzle_orifice").val());
    if(liveUpdate){
        updateProfileView();
    }
});

$("#heated_bed").on("change", function() {
    profile.categories.material.settings.material_bed_temperature.visible = $("#heated_bed").prop("checked");
    if(liveUpdate){
        updateProfileView();
    }
});

$("#machine_center_is_zero").on("change", function() {
    profile.machine_settings.machine_center_is_zero.default = $("#machine_center_is_zero").prop("checked");
    if(liveUpdate){
        updateProfileView();
    }
});

$("#start_gcode").on("input", function() {
    profile.machine_settings.machine_start_gcode.default = $("#start_gcode").val();
    if(liveUpdate){
        updateProfileView();
    }
});

$("#end_gcode").on("input", function() {
    profile.machine_settings.machine_end_gcode.default = $("#end_gcode").val();
    if(liveUpdate){
        updateProfileView();
    }
});

function updateProfileView() {
    var tabStop = parseInt($("#tab-stop").val());
    $("#profile_preview code").text(JSON.stringify(profile, null, tabStop));
    hljs.highlightBlock($("#profile_preview code")[0]);
}

$("#generate_btn").click(function() {
    updateProfileView();
    document.getElementById("profile_preview").style.visibility = "visible";
    document.getElementById("instruction").style.visibility = "visible";
    
    // enable the download button
    $("#download_btn").removeClass("disabled");
    
    liveUpdate = true;
    
    // the genereate button is no longer needed
    $("#generate_btn").fadeOut();
    $("#download_btn").fadeIn();
});

$("#download_btn").click(function() {
    var json = JSON.stringify(profile, null, parseInt($("#tab-stop").val()));
    var blob = new Blob([json], {type: "application/json"});
    var url  = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.download    = $("#machine_id").val();
    a.href        = url;
    a.click();
});


// Initially hide the profile preview, instructions, and download button
document.getElementById("profile_preview").style.visibility = "hidden";
document.getElementById("instruction").style.visibility = "hidden";
$("#download_btn").hide();