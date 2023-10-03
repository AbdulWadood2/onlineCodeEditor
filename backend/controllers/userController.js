/* status codes */
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";
/* fs */
import fs from "fs";
/* for open Html in newTab */
import open from "open";
/* download */
import archiver from "archiver";
const ApplicationProgramInterface = {
  createRegisterFolder: async (req, res) => {
    try {
      const { registerationName } = req.body;
      const parentFolderPath = "./registers"; // Adjust this to the correct absolute path

      fs.readdir(parentFolderPath, (err, files) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Internal server error" });
        }
        if (files.includes(registerationName)) {
          res
            .status(StatusCodes.ACCEPTED)
            .json({ message: "Folder exists plz write another name" });
        } else {
          // Create the folder using the fs.mkdir() method
          fs.mkdir(`${parentFolderPath}/${registerationName}`, (err) => {
            if (err) {
              console.error(`Error creating folder: ${err}`);
            } else {
              // console.log(`Folder '${registerationName}' created successfully.`);

              // Counter to keep track of successful file writes
              let filesCreatedCount = 0;

              // Function to handle file creation
              function createFile(filename, callback) {
                fs.writeFile(
                  `${parentFolderPath}/${registerationName}/${filename}`,
                  "",
                  (err) => {
                    if (err) {
                      console.error(err);
                    } else {
                      filesCreatedCount++;

                      // Check if all three files have been created
                      if (filesCreatedCount === 3) {
                        // All three files have been created successfully
                        res.status(StatusCodes.ACCEPTED).json({
                          message: "success",
                        });
                      }
                    }
                    callback();
                  }
                );
              }

              // Create the three files
              createFile("index.html", () => {});
              createFile("index.css", () => {});
              createFile("index.js", () => {});
            }
          });
        }
      });
    } catch (error) {
      const err = error.stack;
      res.status(StatusCodes.BAD_REQUEST).json({ error: err });
    }
  },
  deleteCompletely: async (req, res) => {
    try {
      const { filename } = req.body;
      fs.rm(`./registers/${filename}`, { recursive: true }, (err) => {
        if (err) {
          console.error(`Error deleting folder: ${err.message}`);
        } else {
          console.log(`Folder deleted successfully`);
        }
      });
    } catch (error) {
      const err = error.stack;
      res.status(StatusCodes.BAD_REQUEST).json({ error: err });
    }
  },
  getFile: async (req, res) => {
    try {
      const { registerationName, filename } = req.body;
      // Use fs.readFile() method to read the file
      fs.readFile(
        `./registers/${registerationName}/${filename}`,
        "utf8",
        function (err, data) {
          // Display the file content
          res.status(200).json({
            data,
          });
        }
      );
    } catch (error) {
      res.status(400).json({
        error,
      });
    }
  },
  writeFile: async (req, res) => {
    try {
      const { registerationName, fileName, data } = req.body;
      // Use fs.readFileSync() method to read the file
      fs.writeFileSync(`./registers/${registerationName}/${fileName}`, data);
      res.status(200).json({ Message: "File written successfully" });
    } catch (error) {
      res.status(400).json({
        error,
      });
    }
  },
  openHtml: async (req, res) => {
    try {
      const { registerationName } = req.body;
      await open(`./registers/${registerationName}/index.html`, { wait: true });
    } catch (error) {
      const err = error.stack;
      res.status(StatusCodes.BAD_REQUEST).json({ error: err });
    }
  },
  saveWorkOnHome: async (req, res) => {
    try {
      const { registerationName } = req.body;

      // Assuming registerationName is the folder name
      const folderPath = `./registers/${registerationName}`;
      // Create a zip archive
      const archive = archiver("zip", {
        zlib: { level: 9 }, // Compression level (0-9)
      });

      // Set response headers for zip file
      res.setHeader("Content-Type", "application/zip");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${registerationName}.zip`
      );

      // Pipe the response stream to the archive
      archive.pipe(res);
      
      // Add files from the folder to the archive with a folder name
      archive.directory(folderPath, registerationName);

      // Finalize the archive
      archive.finalize();
    } catch (error) {
      const err = error.stack;
      res.status(StatusCodes.BAD_REQUEST).json({ error: err });
    }
  },
};

export default ApplicationProgramInterface;
