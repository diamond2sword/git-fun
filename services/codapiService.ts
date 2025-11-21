
export interface CodapiResult {
  ok: boolean;
  output: string;
}

export const runPythonCode = async (code: string): Promise<CodapiResult> => {
  try {
    const response = await fetch('https://api.codapi.org/v1/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sandbox: 'python',
        command: 'run',
        files: {
          '': code
        }
      })
    });

    if (!response.ok) {
      return {
        ok: false,
        output: `Network Error: ${response.status} ${response.statusText}`
      };
    }

    const data = await response.json();
    
    if (data.stderr) {
        return { ok: false, output: data.stderr };
    }
    
    return { ok: true, output: data.stdout || "No output returned." };

  } catch (error) {
    console.error("Codapi execution error:", error);
    return { ok: false, output: "Failed to reach execution server. Please check internet connection." };
  }
};
