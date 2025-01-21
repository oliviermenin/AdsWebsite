<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class FileUploadController extends AbstractController
{
    #[Route('/upload', name: 'file_upload', methods: ['POST'])]
    public function upload(Request $request): JsonResponse
    {
        $uploadedFile = $request->files->get('file');

        if (!$uploadedFile) {
            return new JsonResponse(['error' => 'No file uploaded'], 400);
        }

        $fileName = md5(uniqid()).'.'.$uploadedFile->guessExtension();

        $uploadedFile->move(
            $this->getParameter('uploads_directory'),
            $fileName
        );

        return new JsonResponse([
            'filePath' => '/uploads/'.$fileName
        ]);
    }
}