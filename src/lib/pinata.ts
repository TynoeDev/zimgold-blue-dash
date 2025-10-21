// Pinata IPFS client for decentralized file storage

// Validate environment variables
const PINATA_API_KEY = import.meta.env.VITE_PINATA_API_KEY;
const PINATA_SECRET_API_KEY = import.meta.env.VITE_PINATA_SECRET_API_KEY;
const PINATA_JWT = import.meta.env.VITE_PINATA_JWT;
const PINATA_GATEWAY = import.meta.env.VITE_PINATA_GATEWAY || 'gateway.pinata.cloud';

// Pinata API endpoints
const PINATA_API_URL = 'https://api.pinata.cloud';
const PINATA_PIN_FILE_URL = `${PINATA_API_URL}/pinning/pinFileToIPFS`;
const PINATA_PIN_JSON_URL = `${PINATA_API_URL}/pinning/pinJSONToIPFS`;

export interface PinataUploadResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

export interface IPFSFile {
  ipfs_hash: string;
  filename: string;
  mime_type: string;
  size: number;
  uploaded_at: string;
  url: string;
}

/**
 * Upload a file to IPFS via Pinata
 * @param file - File object to upload
 * @param metadata - Optional metadata (name, keyvalues)
 * @returns IPFS hash and file information
 */
export const uploadFileToPinata = async (
  file: File,
  metadata?: { name?: string; keyvalues?: Record<string, string> }
): Promise<IPFSFile> => {
  if (!PINATA_JWT) {
    throw new Error('Pinata JWT token not configured. Please check your .env file.');
  }

  try {
    const formData = new FormData();
    formData.append('file', file);

    // Add metadata if provided
    if (metadata) {
      const pinataMetadata = JSON.stringify({
        name: metadata.name || file.name,
        keyvalues: metadata.keyvalues || {},
      });
      formData.append('pinataMetadata', pinataMetadata);
    }

    const response = await fetch(PINATA_PIN_FILE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Pinata upload failed: ${error.error || response.statusText}`);
    }

    const data: PinataUploadResponse = await response.json();

    return {
      ipfs_hash: data.IpfsHash,
      filename: file.name,
      mime_type: file.type,
      size: file.size,
      uploaded_at: new Date().toISOString(),
      url: `https://${PINATA_GATEWAY}/ipfs/${data.IpfsHash}`,
    };
  } catch (error) {
    console.error('Error uploading file to Pinata:', error);
    throw error;
  }
};

/**
 * Upload JSON metadata to IPFS via Pinata
 * @param json - JSON object to upload
 * @param metadata - Optional metadata (name, keyvalues)
 * @returns IPFS hash
 */
export const uploadJSONToPinata = async (
  json: object,
  metadata?: { name?: string; keyvalues?: Record<string, string> }
): Promise<string> => {
  if (!PINATA_JWT) {
    throw new Error('Pinata JWT token not configured. Please check your .env file.');
  }

  try {
    const body: any = {
      pinataContent: json,
    };

    if (metadata) {
      body.pinataMetadata = {
        name: metadata.name,
        keyvalues: metadata.keyvalues || {},
      };
    }

    const response = await fetch(PINATA_PIN_JSON_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Pinata JSON upload failed: ${error.error || response.statusText}`);
    }

    const data: PinataUploadResponse = await response.json();
    return data.IpfsHash;
  } catch (error) {
    console.error('Error uploading JSON to Pinata:', error);
    throw error;
  }
};

/**
 * Get IPFS URL from hash
 * @param ipfsHash - IPFS CID
 * @returns Full URL to access the file
 */
export const getIPFSUrl = (ipfsHash: string): string => {
  return `https://${PINATA_GATEWAY}/ipfs/${ipfsHash}`;
};

/**
 * Upload avatar image and return IPFS hash
 * @param file - Image file to upload
 * @param userId - User ID for metadata
 * @returns IPFS hash
 */
export const uploadAvatar = async (file: File, userId: string): Promise<string> => {
  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image');
  }

  // Validate file size (max 5MB)
  const MAX_SIZE = 5 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    throw new Error('Image must be less than 5MB');
  }

  const result = await uploadFileToPinata(file, {
    name: `avatar-${userId}`,
    keyvalues: {
      type: 'avatar',
      userId,
    },
  });

  return result.ipfs_hash;
};

/**
 * Upload deal document and return file info
 * @param file - Document file to upload
 * @param dealId - Deal ID for metadata
 * @param uploadedBy - User ID who uploaded
 * @returns Full file information
 */
export const uploadDealDocument = async (
  file: File,
  dealId: string,
  uploadedBy: string
): Promise<IPFSFile> => {
  // Validate file size (max 20MB)
  const MAX_SIZE = 20 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    throw new Error('Document must be less than 20MB');
  }

  return await uploadFileToPinata(file, {
    name: `deal-${dealId}-${file.name}`,
    keyvalues: {
      type: 'deal-document',
      dealId,
      uploadedBy,
    },
  });
};

/**
 * Upload chat attachment and return file info
 * @param file - Attachment file to upload
 * @param channelId - Channel ID for metadata
 * @param uploadedBy - User ID who uploaded
 * @returns Full file information
 */
export const uploadChatAttachment = async (
  file: File,
  channelId: string,
  uploadedBy: string
): Promise<IPFSFile> => {
  // Validate file size (max 10MB)
  const MAX_SIZE = 10 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    throw new Error('Attachment must be less than 10MB');
  }

  return await uploadFileToPinata(file, {
    name: `chat-${channelId}-${file.name}`,
    keyvalues: {
      type: 'chat-attachment',
      channelId,
      uploadedBy,
    },
  });
};

/**
 * Upload NFT metadata to IPFS
 * @param metadata - NFT metadata object
 * @returns IPFS hash
 */
export const uploadNFTMetadata = async (metadata: {
  name: string;
  description: string;
  image: string;
  attributes: Array<{ trait_type: string; value: string | number }>;
}): Promise<string> => {
  return await uploadJSONToPinata(metadata, {
    name: `nft-metadata-${metadata.name}`,
    keyvalues: {
      type: 'nft-metadata',
    },
  });
};
