
    [
        {
          "key": "Alt+a",
          "label": "Test",
          "action": "javascript",
          "sites": "",
          "sitesArray": [
            ""
          ],
          "code": "if(document.querySelector(`[onclick=\"launchScraping('test');\"]`)){\ndocument.querySelector(`[onclick=\"launchScraping('test');\"]`).click()\n}else{\nalert(`No se puede hacer test acá`)\n}",
          "blacklist": false,
          "activeInInputs": false
        },
        {
          "key": "Alt+z",
          "label": "Submit",
          "action": "javascript",
          "code": "if((document.querySelector(`div[class=\"right-bar\"] div[class=\"content\"] div[class=\"tab-holder\"] div[class=\"tab-content selected\"] button[class=\"fieldSubmit hyper-btn\"]`))){\ndocument.querySelector(`div[class=\"right-bar\"] div[class=\"content\"] div[class=\"tab-holder\"] div[class=\"tab-content selected\"] button[class=\"fieldSubmit hyper-btn\"]`).click()\n}else if(document.querySelector(`[onclick=\"_navbar_save_scanid_info()\"]`)){\n\tdocument.querySelector(`[onclick=\"_navbar_save_scanid_info()\"]`).click()\n}\nelse{\nalert(`Esta accion no es valida`)}",
          "blacklist": false,
          "sites": "",
          "sitesArray": [
            ""
          ]
        },
        {
          "label": "Cerrar",
          "key": "Alt+w",
          "action": "javascript",
          "code": "if(document.querySelector(`[onclick=\"$(this).closest('.right-bar').remove()\"]`)){\n\tdocument.querySelector(`[onclick=\"$(this).closest('.right-bar').remove()\"]`).click();\n}else{\n\talert(`No se puede ejecturar esta acción acá`);\n}",
          "blacklist": false,
          "sites": "",
          "sitesArray": [
            ""
          ]
        },
        {
          "key": "Alt+q",
          "label": "Test step",
          "action": "javascript",
          "code": "if(document.querySelector(`[onclick=\"launchScraping('dynamic-jobdescription');\"]`)){\ndocument.querySelector(`[onclick=\"launchScraping('dynamic-jobdescription');\"]`).click();\n}else{\nalert(`No se puede testear la jobdata acá`)\n}",
          "blacklist": false,
          "sites": "",
          "sitesArray": [
            ""
          ]
        },
        {
          "key": "Alt+1",
          "label": "Extract",
          "action": "javascript",
          "code": "if(document.querySelector(`[onclick=\"hyper_switch_tab(this,'tab-3'); setCode(scanid, 'dynamic-extract', 3);\"]`)){\ndocument.querySelector(`[onclick=\"hyper_switch_tab(this,'tab-3'); setCode(scanid, 'dynamic-extract', 3);\"]`).click()\n}else{\nalert('No se puede ir al step extract acá')\n}",
          "blacklist": false,
          "sites": "",
          "sitesArray": [
            ""
          ]
        },
        {
          "key": "Alt+2",
          "label": "Pagination",
          "action": "javascript",
          "code": "if(document.querySelector(`[onclick=\"hyper_switch_tab(this,'tab-6'); setCode(scanid, 'dynamic-pagination', 6);\"]`)){\ndocument.querySelector(`[onclick=\"hyper_switch_tab(this,'tab-6'); setCode(scanid, 'dynamic-pagination', 6);\"]`).click()\n}else{\nalert('No se puede ir al step pagination acá')\n}",
          "blacklist": false,
          "sites": "",
          "sitesArray": [
            ""
          ]
        },
        {
          "key": "Alt+3",
          "label": "Jobdata",
          "action": "javascript",
          "code": "if(document.querySelector(`[onclick=\"hyper_switch_tab(this,'tab-8'); setCode(scanid, 'dynamic-jobdescription', 8);\"]`)){\ndocument.querySelector(`[onclick=\"hyper_switch_tab(this,'tab-8'); setCode(scanid, 'dynamic-jobdescription', 8);\"]`).click()\n}else{\nalert('No se puede ir al step jobdesc acá')\n}",
          "blacklist": false,
          "sites": "",
          "sitesArray": [
            ""
          ]
        },
        {
          "key": "Alt+4",
          "label": "Configs",
          "action": "javascript",
          "code": "if(`button[id=\"btn-spider-info\"]`){\n        document.querySelector(`button[id=\"btn-spider-info\"]`).click();\n   }else{\n        alert(`No existe el botón`)\n}",
          "blacklist": false,
          "sites": "",
          "sitesArray": [
            ""
          ]
        }
      ]
